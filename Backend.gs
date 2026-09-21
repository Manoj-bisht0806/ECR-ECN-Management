/**
 * Shared backend for the ECR & ECN Management GitHub Pages app.
 * Stores records in a Google Sheet so Chrome, Edge, Internet Explorer/other
 * browsers can see the same data.
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Extensions -> Apps Script.
 * 3. Replace Code.gs with this file.
 * 4. Deploy -> New deployment -> Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 5. Copy the /exec URL into Config.js -> apiUrl.
 */

const SHEET_NAME = 'ECR_ECN_DATA';
const HEADERS = ['type','id','recordJson','updatedAt'];

function getSheet_(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if(!sh) sh = ss.insertSheet(SHEET_NAME);
  if(sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}

function doGet(e){
  const action = (e && e.parameter && e.parameter.action) || 'get';
  if(action !== 'get') return json_({ok:false,error:'Unknown GET action'});
  const sh = getSheet_();
  const values = sh.getDataRange().getValues();
  const out = {ecr:[], ecn:[]};
  for(let i=1;i<values.length;i++){
    const type=String(values[i][0]||'').toUpperCase();
    const raw=String(values[i][2]||'');
    if(!raw) continue;
    try{
      const r=JSON.parse(raw);
      if(type==='ECR') out.ecr.push(r);
      if(type==='ECN') out.ecn.push(r);
    }catch(err){}
  }
  out.ecr.sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
  out.ecn.sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
  return json_(out);
}

function doPost(e){
  const body = JSON.parse(e.postData.contents || '{}');
  const lock=LockService.getScriptLock();
  lock.waitLock(15000);
  try{
    if(body.action==='save'){
      saveRecord_(String(body.type||''),String(body.id||''),body.record||{});
    }else if(body.action==='delete'){
      deleteRecord_(String(body.type||''),String(body.id||''));
    }else if(body.action==='bulk'){
      replaceAll_(body.data||{});
    }else{
      return json_({ok:false,error:'Unknown action'});
    }
    const current=readAll_();
    return json_({ok:true,...current});
  }finally{lock.releaseLock();}
}

function saveRecord_(type,id,record){
  if(!type || !id) throw new Error('type and id required');
  const sh=getSheet_();
  const values=sh.getDataRange().getValues();
  const json=JSON.stringify(record);
  const now=new Date().toISOString();
  for(let i=1;i<values.length;i++){
    if(String(values[i][0])===type && String(values[i][1])===id){
      sh.getRange(i+1,1,1,4).setValues([[type,id,json,now]]);
      return;
    }
  }
  sh.appendRow([type,id,json,now]);
}

function deleteRecord_(type,id){
  const sh=getSheet_();
  const values=sh.getDataRange().getValues();
  for(let i=values.length-1;i>=1;i--){
    if(String(values[i][0])===type && String(values[i][1])===id) sh.deleteRow(i+1);
  }
}

function replaceAll_(data){
  const sh=getSheet_();
  if(sh.getLastRow()>1) sh.getRange(2,1,sh.getLastRow()-1,4).clearContent();
  const rows=[];
  (data.ecr||[]).forEach(r=>rows.push(['ECR',r.id,JSON.stringify(r),new Date().toISOString()]));
  (data.ecn||[]).forEach(r=>rows.push(['ECN',r.id,JSON.stringify(r),new Date().toISOString()]));
  if(rows.length) sh.getRange(2,1,rows.length,4).setValues(rows);
}

function readAll_(){
  const sh=getSheet_();
  const values=sh.getDataRange().getValues();
  const out={ecr:[],ecn:[]};
  for(let i=1;i<values.length;i++){
    try{
      const type=String(values[i][0]||'').toUpperCase();
      const r=JSON.parse(String(values[i][2]||''));
      if(type==='ECR') out.ecr.push(r); else if(type==='ECN') out.ecn.push(r);
    }catch(err){}
  }
  out.ecr.sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
  out.ecn.sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
  return out;
}

function json_(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
