//note: 把地標分兩類，多一個判斷給source參數，減少判斷是否在列表的索引次數

<script type=text/javascript>
  function landmarkRound( num ){
    if( Math.round(num/10) * 10 == 0) { 
      return 5 ;
    }else{
      return Math.round(num/10) * 10 ;
    }
  }

  var landmark_blacklist;
  var landmarkPocClassifier ;
  var joblistItem ;
  var landmarkStart;
  var landmarkEnd;
  var nearStation,nearStationDist,landmark_changelink,landmark_newJobsource,landmarkNewTag;
  var landmarkPocJobNoList;
  var landmark_updateJob;
  var landmarkPocMRTList;

  function replaceContent(group){
    landmarkNewTag = document.createElement('span');
    if (source_poc = "MRT"){
      landmarkNewTag.innerText = "距捷運" + nearStation + "站" + landmarkRound( nearStationDist ) + "公尺";
    }else{
      landmarkNewTag.innerText = "距" + nearStation + landmarkRound( nearStationDist ) + "公尺";
    }
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
    landmark_changelink[0].setAttribute('href' , landmark_newJobsource + group );
    ga('send', {
      hitType: 'event',
      eventCategory: '地標POC',
      eventAction: 'impression_Group'+ group,
      eventLabel: jobNo
    });     
  }
  
  function impressionOnly(group){
    landmark_changelink[0].setAttribute('href' , landmark_newJobsource + group );
    ga('send', {
      hitType: 'event',
      eventCategory: '地標POC',
      eventAction: 'impression_Group'+ group,
      eventLabel: jobNo
    });     

  }

  try{
  landmark_blacklist = [];
  landmarkPocClassifier = '{{JS - random_classifier}}'; //0,1,2
  landmark_updateJob = {'11605698': [477, 7], '10599504': [376, 12], '11581021': [321, 25], '11666817': [476, 62], '9388083': [288, 74], '4599354': [433, 8], '11549305': [347, 59], '11648326': [280, 65], '11668586': [198, 16], '11671238': [236, 11], '11622680': [491, 15], '10716295': [208, 15], '11389896': [111, 30], '11675135': [391, 1], '7703349': [84, 97], '11013054': [472, 51], '11602431': [179, 75], '11602635': [196, 11], '11665972': [357, 9], '11477899': [424, 14], '7569142': [361, 15], '7456369': [412, 13], '11213152': [412, 47], '10715201': [313, 84], '11115472': [472, 51], '11645390': [250, 25], '10688920': [196, 73], '11667843': [443, 16], '11529284': [412, 13], '11502583': [182, 31], '11667192': [263, 15], '7953368': [301, 63], '11175790': [496, 97], '11671905': [441, 9], '11591562': [400, 72], '9056500': [352, 22], '11671285': [378, 25], '11216427': [333, 15], '11672621': [424, 74], '10402651': [351, 10], '11673286': [455, 74], '11014672': [70, 15], '11580423': [282, 103], '10870397': [212, 72], '11617765': [216, 103], '10821333': [320, 24], '11663777': [237, 31], '7611522': [297, 66], '11419365': [229, 99], '8224975': [458, 104], '11334377': [89, 10], '10193025': [41, 9], '11316910': [111, 30], '11556478': [114, 103], '9126670': [282, 101], '11263181': [413, 16], '11631069': [141, 87], '10747806': [297, 66], '9350491': [145, 64], '10103727': [303, 102], '11672750': [361, 16], '4550962': [26, 64], '11539544': [140, 57], '7106623': [113, 9], '10887685': [184, 28], '11633248': [136, 64], '11317741': [319, 62], '11673021': [130, 8], '11600976': [336, 34], '10810047': [115, 9], '10269336': [281, 104], '11349774': [283, 15], '11381369': [111, 30], '8295258': [338, 64], '6105772': [360, 53], '11411238': [347, 9], '11564891': [261, 48], '6482481': [216, 11], '8194647': [293, 32], '11159952': [297, 66], '10658843': [217, 101], '11640686': [164, 64], '11669156': [213, 10], '11667676': [277, 72], '10944677': [163, 15], '11668485': [216, 11], '11672094': [262, 63], '11237780': [208, 61], '7644787': [248, 15], '11670973': [200, 16], '11604455': [284, 101], '8474096': [482, 9], '8203378': [376, 12], '11316854': [347, 51], '10098288': [454, 25], '11662807': [482, 51], '10452089': [111, 86], '11670953': [445, 1], '11147859': [498, 8], '11531490': [324, 79], '11671116': [92, 42], '11538372': [361, 7], '11675103': [308, 65], '11443197': [206, 101], '11631242': [448, 15], '11553415': [142, 1], '11592369': [467, 79], '7653308': [308, 91], '11553416': [142, 1], '9156337': [77, 101], '11093765': [423, 104], '9901322': [321, 101], '8484792': [294, 74], '11595391': [491, 73], '11593327': [487, 74], '11613262': [350, 63], '10810851': [179, 75], '10797023': [467, 79], '11643004': [176, 54], '11329913': [229, 22], '11668098': [449, 15], '10870517': [212, 72], '3704700': [449, 61], '11673179': [271, 104], '11288849': [122, 26], '5797755': [151, 59], '8284549': [491, 12], '10462917': [305, 95], '9099041': [361, 25], '11633118': [26, 64], '11448341': [237, 35], '9196445': [440, 74], '8496755': [441, 7], '11664734': [470, 98], '11673109': [352, 22], '11301429': [265, 15], '11288553': [326, 78], '11674072': [297, 30], '11661446': [349, 106], '10721038': [211, 30], '11578705': [51, 32], '10365848': [313, 18], '10147969': [257, 91], '1638643': [346, 32], '9423842': [363, 1], '11285626': [346, 16], '9673213': [417, 15], '6325943': [318, 77], '4880935': [397, 29], '7341871': [188, 73], '11673566': [112, 33], '11668097': [182, 98], '11668035': [255, 90], '11301762': [464, 26], '9255705': [288, 103], '11663448': [397, 29], '7645737': [91, 8], '4700902': [413, 80], '10708350': [266, 22], '11670688': [134, 49], '11137418': [352, 22], '11437223': [51, 30], '11668770': [179, 75], '10676586': [204, 100], '9374563': [467, 22], '11675160': [323, 63], '11672616': [424, 74], '10953136': [251, 91], '11068566': [99, 47], '10970729': [331, 15], '11668747': [179, 75], '11667651': [278, 100], '10744156': [272, 104], '10845050': [354, 25], '11669853': [284, 10], '11456633': [355, 101], '11455743': [355, 101], '10760195': [156, 103], '11671406': [147, 15], '11427545': [205, 69], '11230267': [397, 29], '5313323': [194, 64], '11673191': [358, 36], '11151963': [294, 74], '11403940': [397, 15], '11675493': [271, 96], '10377910': [419, 16], '11673075': [110, 106], '10901613': [76, 8], '11654926': [122, 24], '10761197': [97, 20], '3662213': [218, 55], '10437278': [392, 62], '10107884': [117, 8], '11363730': [317, 47], '8437500': [74, 81], '11672584': [238, 22], '11665033': [269, 91], '11637386': [285, 33], '11671048': [294, 72], '11335589': [161, 100], '8730205': [127, 64], '8207755': [412, 13], '11535921': [486, 101], '11670701': [275, 9], '11668846': [352, 24], '10750356': [377, 5], '11595314': [412, 22], '10696598': [196, 104], '11006723': [280, 29], '11105602': [316, 16], '10959486': [321, 25], '10992068': [440, 74], '7671437': [478, 11], '11663100': [310, 27], '8284105': [402, 32], '11346995': [306, 58], '11668908': [239, 66], '10146682': [146, 1], '10828765': [382, 61], '10340012': [235, 34], '8177350': [114, 10], '8649568': [255, 77], '10732238': [283, 65], '11615143': [341, 97], '11673830': [476, 62], '11587553': [191, 106], '11666048': [476, 106], '11666134': [467, 79], '11482385': [443, 16], '11382713': [195, 15], '11237084': [397, 29], '11507791': [38, 32], '10592318': [338, 32], '11663900': [237, 101], '8793163': [412, 13], '11569568': [438, 15], '11476507': [357, 79], '6848253': [272, 103], '11628428': [219, 53], '10458294': [123, 10], '11581299': [241, 102], '11394064': [31, 54], '11584688': [76, 63], '11312881': [419, 16], '9768117': [490, 28], '11669081': [425, 10], '8389983': [88, 10], '11672471': [142, 1], '11188289': [88, 10] };
  }catch(e){ 
  }

  
  try{
  var landmark_el = document.createElement('script');
  landmark_el.src = 'https://www.104.com.tw/jobs/search/static/preserve/jobnolist_0615.js';
  landmark_el.async = false;
  document.getElementsByTagName('head')[0].appendChild(landmark_el);
  }catch(e){}
  
  function landmark_show(){
    try{
      joblistItem = document.querySelectorAll('.job-list-item');
      landmarkStart = 0;
      landmarkEnd = joblistItem.length;
      landmarkPocJobNoList_MRT = landmark_MRT_jobs;
      landmarkPocJobNoList_other = landmark_Other_jobs;
      landmarkPocClassifier = '{{JS - random_classifier}}'; //0,1,2
  
      for( updatejob_key in landmark_updateJob ){
        landmarkPocJobNoList_MRT[ updatejob_key ] = landmark_updateJob[updatejob_key];
      }
      landmarkPocMRTList = {{地標POC測試_MRT列表}};
      landmarkPocOtherList = {{地標POC測試_其他地標列表}}
      ga('create', 'UA-165589325-1', 'auto');
  
      if( landmark_loadtime * landmark_intervalms > 4000 ){
        return;
      }
    
      for(i=landmarkStart; i<landmarkEnd;i+=1){

        var jobNo = joblistItem[i].dataset.jobNo;

        if(jobNo){
          if( typeof( landmarkPocJobNoList_MRT[jobNo] ) != 'undefined' ){
            if( joblistItem[i].dataset.jobsource == 'hotjob_chr' || landmark_blacklist.indexOf(jobNo) != -1){
              continue;
            }
            var source_poc = "MRT";
            nearStation = landmarkPocMRTList [ landmarkPocJobNoList_MRT[jobNo][1] ];
            nearStationDist = landmarkPocJobNoList_MRT[jobNo][0];
            landmark_changelink = joblistItem[i].querySelectorAll('.js-job-link');
            landmark_newJobsource = landmark_changelink[0].getAttribute('href').split('jobsource=')[0] + 'jobsource=landmarkPOC_';
          }else if( typeof( landmarkPocJobNoList_other[jobNo] ) != 'undefined'){
            if( joblistItem[i].dataset.jobsource == 'hotjob_chr' || landmark_blacklist.indexOf(jobNo) != -1){
              continue;
            }
            var source_poc = "Other";
            nearStation = landmarkPocOtherList [ landmarkPocJobNoList_other[jobNo][1] ];
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
    if( typeof(landmark_jobs) != 'undefined' ){
      landmark_show();
      clearInterval(landmark_interval);
    }else{
      landmark_loadtime += 1;
    }
  },landmark_intervalms );

</script>