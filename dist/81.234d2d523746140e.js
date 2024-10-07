"use strict";(self.webpackChunkcion_angular_16=self.webpackChunkcion_angular_16||[]).push([[81],{7455:(y,g,p)=>{p.d(g,{l:()=>u});var l=p(6911),f=p(4438);let u=(()=>{class d extends l.tN{parse(a){if(a){const h=a.trim().split("/");if(3===h.length)return{day:parseInt(h[0],10),month:parseInt(h[1],10),year:parseInt(h[2],10)}}return null}format(a){return a?`${this.padNumber(a.day)}-${this.padNumber(a.month)}-${a.year}`:""}padNumber(a){return null!==a?`0${a}`.slice(-2):""}static#e=this.\u0275fac=(()=>{let a;return function(x){return(a||(a=f.xGo(d)))(x||d)}})();static#t=this.\u0275prov=f.jDH({token:d,factory:d.\u0275fac})}return d})()},2938:(y,g,p)=>{p.d(g,{N:()=>u});var l=p(9417);const f=/[^\s\w,.:&\/()+%'`@-]/;class u extends l.k0{static noWhitespaceValidator(m){return 0!==(m.value||"").trim().length?null:{whitespace:!0}}static test(m){if(m.value&&m.value.length>0){const a=m.value.match(f);return a&&a.length?{not_allowed_characters:a}:null}return null}}},7200:(y,g,p)=>{p.d(g,{Ff:()=>x,UJ:()=>T,eB:()=>w,l0:()=>h});var l=p(4438),f=p(177);class u{constructor(e){this.rawFile=e;const t=e instanceof HTMLInputElement?e.value:e;this["_createFrom"+("string"==typeof t?"FakePath":"Object")](t)}_createFromFakePath(e){this.lastModifiedDate=void 0,this.size=void 0,this.type=`like/${e.slice(e.lastIndexOf(".")+1).toLowerCase()}`,this.name=e.slice(e.lastIndexOf("/")+e.lastIndexOf("\\")+2)}_createFromObject(e){this.size=e.size,this.type=e.type,this.name=e.name}}class d{constructor(e,t,i){this.url="/",this.headers=[],this.withCredentials=!0,this.formData=[],this.isReady=!1,this.isUploading=!1,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!1,this.isError=!1,this.progress=0,this.uploader=e,this.some=t,this.options=i,this.file=new u(t),this._file=t,e.options&&(this.method=e.options.method||"POST",this.alias=e.options.itemAlias||"file"),this.url=e.options.url}upload(){try{this.uploader.uploadItem(this)}catch{this.uploader._onCompleteItem(this,"",0,{}),this.uploader._onErrorItem(this,"",0,{})}}cancel(){this.uploader.cancelItem(this)}remove(){this.uploader.removeFromQueue(this)}onBeforeUpload(){}onBuildForm(e){return{form:e}}onProgress(e){return{progress:e}}onSuccess(e,t,i){return{response:e,status:t,headers:i}}onError(e,t,i){return{response:e,status:t,headers:i}}onCancel(e,t,i){return{response:e,status:t,headers:i}}onComplete(e,t,i){return{response:e,status:t,headers:i}}_onBeforeUpload(){this.isReady=!0,this.isUploading=!0,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!1,this.isError=!1,this.progress=0,this.onBeforeUpload()}_onBuildForm(e){this.onBuildForm(e)}_onProgress(e){this.progress=e,this.onProgress(e)}_onSuccess(e,t,i){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!0,this.isCancel=!1,this.isError=!1,this.progress=100,this.index=void 0,this.onSuccess(e,t,i)}_onError(e,t,i){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!1,this.isCancel=!1,this.isError=!0,this.progress=0,this.index=void 0,this.onError(e,t,i)}_onCancel(e,t,i){this.isReady=!1,this.isUploading=!1,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!0,this.isError=!1,this.progress=0,this.index=void 0,this.onCancel(e,t,i)}_onComplete(e,t,i){this.onComplete(e,t,i),this.uploader.options.removeAfterUpload&&this.remove()}_prepareToUploading(){this.index=this.index||++this.uploader._nextIndex,this.isReady=!0}}let m=(()=>{class r{static#e=this.mime_doc=["application/msword","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.openxmlformats-officedocument.wordprocessingml.template","application/vnd.ms-word.document.macroEnabled.12","application/vnd.ms-word.template.macroEnabled.12"];static#t=this.mime_xsl=["application/vnd.ms-excel","application/vnd.ms-excel","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.spreadsheetml.template","application/vnd.ms-excel.sheet.macroEnabled.12","application/vnd.ms-excel.template.macroEnabled.12","application/vnd.ms-excel.addin.macroEnabled.12","application/vnd.ms-excel.sheet.binary.macroEnabled.12"];static#i=this.mime_ppt=["application/vnd.ms-powerpoint","application/vnd.ms-powerpoint","application/vnd.ms-powerpoint","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/vnd.openxmlformats-officedocument.presentationml.template","application/vnd.openxmlformats-officedocument.presentationml.slideshow","application/vnd.ms-powerpoint.addin.macroEnabled.12","application/vnd.ms-powerpoint.presentation.macroEnabled.12","application/vnd.ms-powerpoint.presentation.macroEnabled.12","application/vnd.ms-powerpoint.slideshow.macroEnabled.12"];static#s=this.mime_psd=["image/photoshop","image/x-photoshop","image/psd","application/photoshop","application/psd","zz-application/zz-winassoc-psd"];static#o=this.mime_compress=["application/x-gtar","application/x-gcompress","application/compress","application/x-tar","application/x-rar-compressed","application/octet-stream","application/x-zip-compressed","application/zip-compressed","application/x-7z-compressed","application/gzip","application/x-bzip2"];static getMimeClass(t){let i="application";return t?.type&&-1!==this.mime_psd.indexOf(t.type)||t?.type?.match("image.*")?i="image":t?.type?.match("video.*")?i="video":t?.type?.match("audio.*")?i="audio":"application/pdf"===t?.type?i="pdf":t?.type&&-1!==this.mime_compress.indexOf(t.type)?i="compress":t?.type&&-1!==this.mime_doc.indexOf(t.type)?i="doc":t?.type&&-1!==this.mime_xsl.indexOf(t.type)?i="xls":t?.type&&-1!==this.mime_ppt.indexOf(t.type)&&(i="ppt"),"application"===i&&t?.name&&(i=this.fileTypeDetection(t.name)),i}static fileTypeDetection(t){const i={jpg:"image",jpeg:"image",tif:"image",psd:"image",bmp:"image",png:"image",nef:"image",tiff:"image",cr2:"image",dwg:"image",cdr:"image",ai:"image",indd:"image",pin:"image",cdp:"image",skp:"image",stp:"image","3dm":"image",mp3:"audio",wav:"audio",wma:"audio",mod:"audio",m4a:"audio",compress:"compress",zip:"compress",rar:"compress","7z":"compress",lz:"compress",z01:"compress",bz2:"compress",gz:"compress",pdf:"pdf",xls:"xls",xlsx:"xls",ods:"xls",mp4:"video",avi:"video",wmv:"video",mpg:"video",mts:"video",flv:"video","3gp":"video",vob:"video",m4v:"video",mpeg:"video",m2ts:"video",mov:"video",doc:"doc",docx:"doc",eps:"doc",txt:"doc",odt:"doc",rtf:"doc",ppt:"ppt",pptx:"ppt",pps:"ppt",ppsx:"ppt",odp:"ppt"},s=t.split(".");if(s.length<2)return"application";const o=s[s.length-1].toLowerCase();return void 0===i[o]?"application":i[o]}}return r})();class h{constructor(e){this.isUploading=!1,this.queue=[],this.progress=0,this._nextIndex=0,this.options={autoUpload:!1,isHTML5:!0,filters:[],removeAfterUpload:!1,disableMultipart:!1,formatDataFunction:t=>t._file,formatDataFunctionIsAsync:!1,url:""},this.setOptions(e),this.response=new l.bkB}setOptions(e){this.options=Object.assign(this.options,e),this.authToken=this.options.authToken,this.authTokenHeader=this.options.authTokenHeader||"Authorization",this.autoUpload=this.options.autoUpload,this.options.filters?.unshift({name:"queueLimit",fn:this._queueLimitFilter}),this.options.maxFileSize&&this.options.filters?.unshift({name:"fileSize",fn:this._fileSizeFilter}),this.options.allowedFileType&&this.options.filters?.unshift({name:"fileType",fn:this._fileTypeFilter}),this.options.allowedMimeType&&this.options.filters?.unshift({name:"mimeType",fn:this._mimeTypeFilter});for(let t=0;t<this.queue.length;t++)this.queue[t].url=this.options.url}addToQueue(e,t,i){let s=t;const o=[];for(const v of e)o.push(v);const n=this._getFilters(i),c=this.queue.length,F=[];o.map(v=>{s||(s=this.options);const I=new u(v);if(this._isValidFile(I,n,s)){const _=new d(this,v,s);F.push(_),this.queue.push(_),this._onAfterAddingFile(_)}else"number"==typeof this._failFilterIndex&&this._failFilterIndex>=0&&this._onWhenAddingFileFailed(I,n[this._failFilterIndex],s)}),this.queue.length!==c&&(this._onAfterAddingAll(F),this.progress=this._getTotalProgress()),this._render(),this.options.autoUpload&&this.uploadAll()}removeFromQueue(e){const t=this.getIndexOfItem(e),i=this.queue[t];i.isUploading&&i.cancel(),this.queue.splice(t,1),this.progress=this._getTotalProgress()}clearQueue(){for(;this.queue.length;)this.queue[0].remove();this.progress=0}uploadItem(e){const t=this.getIndexOfItem(e),i=this.queue[t],s=this.options.isHTML5?"_xhrTransport":"_iframeTransport";i._prepareToUploading(),!this.isUploading&&(this.isUploading=!0,this[s](i))}cancelItem(e){const t=this.getIndexOfItem(e),i=this.queue[t];i&&i.isUploading&&(this.options.isHTML5?i._xhr:i._form).abort()}uploadAll(){const e=this.getNotUploadedItems().filter(t=>!t.isUploading);e.length&&(e.map(t=>t._prepareToUploading()),e[0].upload())}cancelAll(){this.getNotUploadedItems().map(t=>t.cancel())}isFile(e){return function a(r){return File&&r instanceof File}(e)}isFileLikeObject(e){return e instanceof u}getIndexOfItem(e){return"number"==typeof e?e:this.queue.indexOf(e)}getNotUploadedItems(){return this.queue.filter(e=>!e.isUploaded)}getReadyItems(){return this.queue.filter(e=>e.isReady&&!e.isUploading).sort((e,t)=>e.index-t.index)}onAfterAddingAll(e){return{fileItems:e}}onBuildItemForm(e,t){return{fileItem:e,form:t}}onAfterAddingFile(e){return{fileItem:e}}onWhenAddingFileFailed(e,t,i){return{item:e,filter:t,options:i}}onBeforeUploadItem(e){return{fileItem:e}}onProgressItem(e,t){return{fileItem:e,progress:t}}onProgressAll(e){return{progress:e}}onSuccessItem(e,t,i,s){return{item:e,response:t,status:i,headers:s}}onErrorItem(e,t,i,s){return{item:e,response:t,status:i,headers:s}}onCancelItem(e,t,i,s){return{item:e,response:t,status:i,headers:s}}onCompleteItem(e,t,i,s){return{item:e,response:t,status:i,headers:s}}onCompleteAll(){}_mimeTypeFilter(e){return!(e?.type&&this.options.allowedMimeType&&-1===this.options.allowedMimeType?.indexOf(e.type))}_fileSizeFilter(e){return!(this.options.maxFileSize&&e.size>this.options.maxFileSize)}_fileTypeFilter(e){return!(this.options.allowedFileType&&-1===this.options.allowedFileType.indexOf(m.getMimeClass(e)))}_onErrorItem(e,t,i,s){e._onError(t,i,s),this.onErrorItem(e,t,i,s)}_onCompleteItem(e,t,i,s){e._onComplete(t,i,s),this.onCompleteItem(e,t,i,s);const o=this.getReadyItems()[0];this.isUploading=!1,o?o.upload():(this.onCompleteAll(),this.progress=this._getTotalProgress(),this._render())}_headersGetter(e){return t=>t?e[t.toLowerCase()]||void 0:e}_xhrTransport(e){const t=this,i=e._xhr=new XMLHttpRequest;let s;if(this._onBeforeUploadItem(e),"number"!=typeof e._file.size)throw new TypeError("The file specified is no longer valid");if(this.options.disableMultipart)this.options.formatDataFunction&&(s=this.options.formatDataFunction(e));else{s=new FormData,this._onBuildItemForm(e,s);const o=()=>s.append(e.alias,e._file,e.file.name);this.options.parametersBeforeFiles||o(),void 0!==this.options.additionalParameter&&Object.keys(this.options.additionalParameter).forEach(n=>{let c=this.options.additionalParameter?.[n];"string"==typeof c&&c.indexOf("{{file_name}}")>=0&&e.file?.name&&(c=c.replace("{{file_name}}",e.file.name)),s.append(n,c)}),o&&this.options.parametersBeforeFiles&&o()}if(i.upload.onprogress=o=>{const n=Math.round(o.lengthComputable?100*o.loaded/o.total:0);this._onProgressItem(e,n)},i.onload=()=>{const o=this._parseHeaders(i.getAllResponseHeaders()),n=this._transformResponse(i.response);this[`_on${this._isSuccessCode(i.status)?"Success":"Error"}Item`](e,n,i.status,o),this._onCompleteItem(e,n,i.status,o)},i.onerror=()=>{const o=this._parseHeaders(i.getAllResponseHeaders()),n=this._transformResponse(i.response);this._onErrorItem(e,n,i.status,o),this._onCompleteItem(e,n,i.status,o)},i.onabort=()=>{const o=this._parseHeaders(i.getAllResponseHeaders()),n=this._transformResponse(i.response);this._onCancelItem(e,n,i.status,o),this._onCompleteItem(e,n,i.status,o)},e.method&&e.url&&i.open(e.method,e.url,!0),i.withCredentials=e.withCredentials,this.options.headers)for(const o of this.options.headers)i.setRequestHeader(o.name,o.value);if(e.headers.length)for(const o of e.headers)i.setRequestHeader(o.name,o.value);this.authToken&&this.authTokenHeader&&i.setRequestHeader(this.authTokenHeader,this.authToken),i.onreadystatechange=function(){i.readyState==XMLHttpRequest.DONE&&t.response.emit(i.responseText)},this.options.formatDataFunctionIsAsync?s.then(o=>i.send(JSON.stringify(o))):i.send(s),this._render()}_getTotalProgress(e=0){if(this.options.removeAfterUpload)return e;const t=this.getNotUploadedItems().length,s=100/this.queue.length;return Math.round((t?this.queue.length-t:this.queue.length)*s+e*s/100)}_getFilters(e){if(!e)return this.options?.filters||[];if(Array.isArray(e))return e;if("string"==typeof e){const t=e.match(/[^\s,]+/g);return this.options?.filters||[].filter(i=>-1!==t?.indexOf(i.name))}return this.options?.filters||[]}_render(){}_queueLimitFilter(){return void 0===this.options.queueLimit||this.queue.length<this.options.queueLimit}_isValidFile(e,t,i){return this._failFilterIndex=-1,!t.length||t.every(s=>("number"==typeof this._failFilterIndex&&this._failFilterIndex++,s.fn.call(this,e,i)))}_isSuccessCode(e){return e>=200&&e<300||304===e}_transformResponse(e){return e}_parseHeaders(e){const t={};let i,s,o;return e&&e.split("\n").map(n=>{o=n.indexOf(":"),i=n.slice(0,o).trim().toLowerCase(),s=n.slice(o+1).trim(),i&&(t[i]=t[i]?t[i]+", "+s:s)}),t}_onWhenAddingFileFailed(e,t,i){this.onWhenAddingFileFailed(e,t,i)}_onAfterAddingFile(e){this.onAfterAddingFile(e)}_onAfterAddingAll(e){this.onAfterAddingAll(e)}_onBeforeUploadItem(e){e._onBeforeUpload(),this.onBeforeUploadItem(e)}_onBuildItemForm(e,t){e._onBuildForm(t),this.onBuildItemForm(e,t)}_onProgressItem(e,t){const i=this._getTotalProgress(t);this.progress=i,e._onProgress(t),this.onProgressItem(e,t),this.onProgressAll(i),this._render()}_onSuccessItem(e,t,i,s){e._onSuccess(t,i,s),this.onSuccessItem(e,t,i,s)}_onCancelItem(e,t,i,s){e._onCancel(t,i,s),this.onCancelItem(e,t,i,s)}}let x=(()=>{class r{constructor(t){this.fileOver=new l.bkB,this.onFileDrop=new l.bkB,this.element=t}getOptions(){return this.uploader?.options}getFilters(){return""}onDrop(t){const i=this._getTransfer(t);if(!i)return;const s=this.getOptions(),o=this.getFilters();this._preventAndStop(t),s&&this.uploader?.addToQueue(i.files,s,o),this.fileOver.emit(!1),this.onFileDrop.emit(i.files)}onDragOver(t){const i=this._getTransfer(t);this._haveFiles(i.types)&&(i.dropEffect="copy",this._preventAndStop(t),this.fileOver.emit(!0))}onDragLeave(t){this.element&&t.currentTarget===this.element[0]||(this._preventAndStop(t),this.fileOver.emit(!1))}_getTransfer(t){return t.dataTransfer?t.dataTransfer:t.originalEvent.dataTransfer}_preventAndStop(t){t.preventDefault(),t.stopPropagation()}_haveFiles(t){return!!t&&(t.indexOf?-1!==t.indexOf("Files"):!!t.contains&&t.contains("Files"))}static#e=this.\u0275fac=function(i){return new(i||r)(l.rXU(l.aKT))};static#t=this.\u0275dir=l.FsC({type:r,selectors:[["","ng2FileDrop",""]],hostBindings:function(i,s){1&i&&l.bIt("drop",function(n){return s.onDrop(n)})("dragover",function(n){return s.onDragOver(n)})("dragleave",function(n){return s.onDragLeave(n)})},inputs:{uploader:"uploader"},outputs:{fileOver:"fileOver",onFileDrop:"onFileDrop"}})}return r})(),T=(()=>{class r{constructor(t){this.onFileSelected=new l.bkB,this.element=t}getOptions(){return this.uploader?.options}getFilters(){return""}isEmptyAfterSelection(){return!!this.element.nativeElement.attributes.multiple}onChange(){const t=this.element.nativeElement.files,i=this.getOptions(),s=this.getFilters();this.uploader?.addToQueue(t,i,s),this.onFileSelected.emit(t),this.isEmptyAfterSelection()&&(this.element.nativeElement.value="")}static#e=this.\u0275fac=function(i){return new(i||r)(l.rXU(l.aKT))};static#t=this.\u0275dir=l.FsC({type:r,selectors:[["","ng2FileSelect",""]],hostBindings:function(i,s){1&i&&l.bIt("change",function(){return s.onChange()})},inputs:{uploader:"uploader"},outputs:{onFileSelected:"onFileSelected"}})}return r})(),w=(()=>{class r{static#e=this.\u0275fac=function(i){return new(i||r)};static#t=this.\u0275mod=l.$C({type:r});static#i=this.\u0275inj=l.G2t({imports:[f.MD]})}return r})()}}]);