<script type=text/javascript>
  var landmark_blacklist;
  var landmarkPocClassifier ;
  var joblistItem ;
  var landmarkStart;
  var landmarkEnd;
  var nearStation,nearStationDist,landmark_changelink,landmark_newJobsource,landmarkNewTag,source_poc,landmark_type;
  var landmarkPocJobNoList;
  var landmark_updateJob;
  var landmarkPocMRTList;

  function replaceContent(group){
    landmarkNewTag = document.createElement('span');
    landmarkNewTag.innerText = "距" + nearStation + nearStationDist + "公尺";
    landmarkNewTag.setAttribute('class' , 'b-tag--default');
    var landmark_joblisttag = joblistItem[i].getElementsByClassName('job-list-tag');
    if ( landmark_joblisttag.length == 0 ){
      var landmark_joblisttag_element = document.createElement('div');
      landmark_joblisttag_element.setAttribute('class' , 'job-list-tag b-content');
      joblistItem[i].getElementsByClassName('b-block__left')[0].appendChild(landmark_joblisttag_element);
    }
    var landmark_greytags = joblistItem[i].getElementsByClassName('job-list-tag')[0].querySelectorAll('.b-tag--default');
    if( landmark_greytags[ landmark_greytags.length - 1 ].innerText.search('公尺') != -1 ){
      continue;
    }
    joblistItem[i].getElementsByClassName('job-list-tag')[0].appendChild(landmarkNewTag);
    landmark_changelink[0].setAttribute('href' , landmark_newJobsource + group + landmark_type);
    ga('send', {
      hitType: 'event',
      eventCategory: '地標POC',
      eventAction: 'impression_Group'+ group,
      eventLabel: jobNo
    });     
  }
  
  function impressionOnly(group){
    landmark_changelink[0].setAttribute('href' , landmark_newJobsource + group + landmark_type);
    ga('send', {
      hitType: 'event',
      eventCategory: '地標POC',
      eventAction: 'impression_Group'+ group,
      eventLabel: jobNo
    });     

  }

  function landmarkType( name ){
    var l_type = '&landType=';
    if (source_poc == 'MRT'){
      l_type += 'R';
    }else if( ( name.search( '圖書' ) != -1 ) || (name.search( '文化中心' ) != -1 ) || (name.search( '文化服務所' ) != -1 ) ){
      l_type += 'L';
    }else if ( ( name.search( '市政府' ) != -1 ) || (name.search( '縣政府' ) != -1 ) || (name.search( '市政中心' ) != -1 ) || (name.search( '行政中心' ) != -1 ) ){
      l_type += 'C';
    }else if( ( name.search( '公所' ) != -1 )){
      l_type += 'M';
    }else{
      l_type += 'H';
    }
    return l_type;
  }

  try{
  landmark_blacklist = [];
  landmarkPocClassifier = '{{JS - random_classifier}}'; //0,1,2
  //landmark_updateJob = {};
  }catch(e){ 
  }

  
  try{
    var landmark_el = document.createElement('script');
    landmark_el.src = 'https://www.104.com.tw/jobs/search/static/preserve/jobnolist_0615.js';
    landmark_el.async = false;
    document.getElementsByTagName('head')[0].appendChild(landmark_el);
  }catch(e){}

  try{
    joblistItem = document.querySelectorAll('.job-list-item');
    landmarkStart = 0;
    landmarkEnd = joblistItem.length;
    landmarkPocJobNoList_MRT = landmark_MRT_jobs;
    landmarkPocJobNoList_other = landmark_Other_jobs;
    /*
    for( updatejob_key in landmark_updateJob ){
      landmarkPocJobNoList_MRT[ updatejob_key ] = landmark_updateJob[updatejob_key];
    }
    */
    landmarkPocMRTList = {{地標POC測試_MRT列表}};
    landmarkPocOtherList = {{地標POC測試_其他地標列表}};
    ga('create', 'UA-165589325-3', 'auto');

    if( landmark_loadtime * landmark_intervalms > 4000 ){
      return;
    }
  }catch(e){}
  
  function landmark_show(){
    try{
      
      
      
      
    
      for(i=landmarkStart; i<landmarkEnd;i+=1){

        var jobNo = joblistItem[i].dataset.jobNo;

        if(jobNo){
          if( typeof( landmarkPocJobNoList_MRT[jobNo] ) != 'undefined' ){
            if( joblistItem[i].dataset.jobsource == 'hotjob_chr' || landmark_blacklist.indexOf(jobNo) != -1){
              continue;
            }
            source_poc = "MRT";
            nearStation = landmarkPocMRTList [ landmarkPocJobNoList_MRT[jobNo][1] ];
            landmark_type = landmarkType( nearStation );
            nearStationDist = landmarkPocJobNoList_MRT[jobNo][0];
            landmark_changelink = joblistItem[i].querySelectorAll('.js-job-link');
            landmark_newJobsource = landmark_changelink[0].getAttribute('href').split('jobsource=')[0] + 'jobsource=landmarkPOC_';
          }else if( typeof( landmarkPocJobNoList_other[jobNo] ) != 'undefined'){
            if( joblistItem[i].dataset.jobsource == 'hotjob_chr' || landmark_blacklist.indexOf(jobNo) != -1){
              continue;
            }
            source_poc = "Other";
            nearStation = landmarkPocOtherList [ landmarkPocJobNoList_other[jobNo][1] ];
            landmark_type = landmarkType( nearStation );
            nearStationDist = landmarkPocJobNoList_other[jobNo][0];
            landmark_changelink = joblistItem[i].querySelectorAll('.js-job-link');
            landmark_newJobsource = landmark_changelink[0].getAttribute('href').split('jobsource=')[0] + 'jobsource=landmarkPOC_';
          }else{
          continue;
        }
        }else{
          continue;
        }

        switch (String(landmarkPocClassifier)+source_poc){
          case "1MRT" :
          replaceContent("AA");
            break;
          case "2MRT" :
          replaceContent("B");        
            break;
          case "0MRT"  :
          impressionOnly("C");
            break
          case "1Other" :
          replaceContent("D");
            break;
          case "2Other" :
          impressionOnly("E");
            break;
          case "0Other" :
          impressionOnly("F");
            break;
          default :
          ga('send', {
            hitType: 'event',
            eventCategory: '地標POC',
            eventAction: 'Error',
            eventLabel: jobNo
          });
          break;
        }
      }
    }catch(e){
      console.log(e)
    }
  }
  
  var landmark_loadtime = 1;
  var landmark_intervalms = 300;
  var landmark_interval = setInterval( function(){
    if( typeof(landmark_MRT_jobs) != 'undefined' && typeof(landmark_Other_jobs) != 'undefined'){
      landmark_show();
      clearInterval(landmark_interval);
    }else{
      landmark_loadtime += 1;
    }
  },landmark_intervalms );

</script>