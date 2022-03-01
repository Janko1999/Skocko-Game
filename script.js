$(document).ready(function(){
    $zadataKombinacijaA=[];
    $zadataKombinacijaB=[];
    inicijalizujKombinacije();
    $turn=0;
    var crveneNiz=[];
    var zuteNizZ=[];
    var zuteNizT=[];
    //Counteri za pracenje unesenih znakova
    $counterA=1;
    $counterB=1;
    //Counteri za pracenje crvenih i zutih polja
    $counterPA=1;
    $counterPB=1;
    //niz dosad obojenih kvadrata
    $provereA=[];
    $provereB=[];
    for(let i=0;i<27;i++){
    $provereA[i]="#fefef3";
    $provereB[i]="#fefef3";
    }
    //niz dosad unesenih zankova
    $znakoviA=[];
    $znakoviB=[];
    for(let i=0;i<27;i++){
    $znakoviA[i]="";
    $znakoviB[i]="";
    }
    //Timers
    $timeA=60;
    $timeB=60;
    //Flegovi da je moguce kliknuti na dugme za proveru unete kombinacije
    $boolA=true;
    $boolB=true;

    $indexA=0;
    $indexB=0;
    $start=false;
    $first=true;
    $k=true;
    $kraj=false;
    $brojPokusajaA=0;
    $brojPokusajaB=0;
    $trenutnaKombinacija=[];
    $('.znak').click(function(){
        if($start && !$kraj){
        if($turn==0){
            if($boolA){
                $("#"+$counterA).append(
                   $("<img>").attr("src", $(this).attr("src")).attr("class", "znak"));
                    $trenutnaKombinacija[$indexA++]=$(this).attr("name");
                    $znakoviA[$counterA]=$(this).attr("src");
                    if($counterA % 4 ==0) { $boolA=false; $indexA=0;}
                    $counterA++;
                }
        }
        else {
            if($boolB){
                $("#"+$counterB).append(
                    $("<img>").attr("src", $(this).attr("src")).attr("class", "znak"));
                    $trenutnaKombinacija[$indexB++]=$(this).attr("name");
                    $znakoviB[$counterB]=$(this).attr("src");
                    if($counterB % 4 == 0) {$boolB=false; $indexB=0;}
                    $counterB++;
                }

        }
     }}) 
     $(".potvrda").click(function(){
         if($turn==0){
            if($boolA==false){
                $brojPokusajaA++;
                crveneNiz=[];
                zuteNizT=[];
                zuteNizZ=[];
                $crvene=0;
                $zute=0;
                let j=0;
                for(let i=0;i<4;i++){
                    if($trenutnaKombinacija[i]==$zadataKombinacijaA[i]){
                        crveneNiz.push(i);
                        $crvene++;
                    }
                }
                
                for(let i=0;i<4;i++){
                    $flag=false;
                    for(let j=0;j<4;j++){
                    if($trenutnaKombinacija[i]==$zadataKombinacijaA[j] && !notInCrvene(i,j) && !notInZute(i,j)){
                        $zute++;
                        zuteNizT.push(i);
                       zuteNizZ.push(j);
                    }
                }

                }
               
               $sive=4-$zute-$crvene;
             
               for(let i=0;i<$crvene;i++){
                   $provereA[$counterPA]="red";
                   $("#p"+$counterPA).css({"background-color":"red"});
                   $counterPA++;
               }
               for(let i=0;i<$zute;i++){
                $provereA[$counterPA]="yellow";
                $("#p"+$counterPA).css({"background-color":"yellow"});
                $counterPA++;
            }
            for(let i=0;i<$sive;i++){
                $counterPA++;
            }
            if($crvene==4) { 
                //azurirajB(); 
                for(let i=0;i<4;i++){
                    $("#k"+i).append(
                        $("<img>").attr("src",$("img[name='"+$zadataKombinacijaA[i]+"']").attr("src")).attr("class", "znak")
                    )
                }
                alert("Pobednik je igrac "+ ($turn+1)); 
                $kraj=true;
                clearInterval(updateTime);
                return;
            }
               $trenutnaKombinacija=[]; 
               $bool=true;
               $turn=1;
            
               setTimeout(azurirajB,1500);
            $turn=1;
            $boolA=true; 
            proveriPokusaje();
            }   
         }
         else{
            if($boolB==false){
                $brojPokusajaB++;
                crveneNiz=[];
                zuteNizT=[];
                zuteNizZ=[];
                $crvene=0;
                $zute=0;
              
                for(let i=0;i<4;i++){
                    if($trenutnaKombinacija[i]==$zadataKombinacijaB[i]){
                        crveneNiz.push(i);
                        
                        $crvene++;
                        //alert($crvene[i]);
                    }
                }
                for(let i=0;i<4;i++){
                    $flag=false;
                    for(let j=0;j<4;j++){
                    if($trenutnaKombinacija[i]==$zadataKombinacijaB[j] && !notInCrvene(i,j) && !notInZute(i,j)){
                       $zute++;
                       zuteNizT.push(i);
                       zuteNizZ.push(j);
                    }
                }
                }
               $sive=4-$zute-$crvene;
               for(let i=0;i<$crvene;i++){
                   $provereB[$counterPB]="red";
                   $("#p"+$counterPB).css({"background-color":"red"});
                   $counterPB++;
               }
               for(let i=0;i<$zute;i++){
                $provereB[$counterPB]="yellow";
                $("#p"+$counterPB).css({"background-color":"yellow"});
                $counterPB++;
            }
            for(let i=0;i<$sive;i++){
                $counterPB++;
            }
            if($crvene==4) { 
                //azurirajA(); 
                for(let i=0;i<4;i++){
                    $("#k"+i).append(
                        $("<img>").attr("src",$("img[name='"+$zadataKombinacijaB[i]+"']").attr("src")).attr("class", "znak")
                    )
                }
                alert("Pobednik je igrac "+ ($turn+1)); 
                $kraj=true;
                clearInterval(updateTime);
                
                 return;}
               $trenutnaKombinacija=[]; 
               $bool=true;
               $turn=1;
           setTimeout(azurirajA,1500);
            
            $turn=0;
            $boolB=true; 
            proveriPokusaje();
        }

         }
     }) 
     function notInZute(i,j){
         for(let k=0;k<zuteNizT.length;k++){
             if(i==zuteNizT[k])
             return true;
         }
         for(let k=0;k<zuteNizZ.length;k++){
            if(j==zuteNizZ[k])
            return true;
        }
        return false;

     }
     function notInCrvene(j,k){
         for(let i=0;i<crveneNiz.length;i++){
             if(j==crveneNiz[i] || k==crveneNiz[i]){
                 return true;
             }
         }
         return false;
     }
    function azurirajB(){
        $("#Igrac").html("Na potezu je igrac 2");
        for(let i=1;i<$counterPA;i++){
            $("#p"+i).css({"background-color":$provereB[i]});
        }
        for(let i=1;i<$counterB;i++){
            $("#"+i+" img").attr("src",$znakoviB[i]).attr("class","znak")
            }
        for(let i=$counterB;i<$counterA;i++){
            $("#"+i+" img").remove();
        } 
        for(let i=0;i<4;i++)
                $("#k"+i+" img").remove();
        

    }
    function azurirajA(){
        $("#Igrac").html("Na potezu je igrac 1");
        for(let i=1;i<$counterPB;i++){
            $("#p"+i).css({"background-color":$provereA[i]});
        }
        for(let i=1;i<$counterB;i++){
            $("#"+i+" img").attr("src",$znakoviA[i]).attr("class","znak")
            }
            
    }
    $("#start").click(function(){
        if($first){
            $first=false;
        $start=true;
        $timeA=60;
        $timeB=60;
        setInterval(updateTime,1000);
        }
    })
    function updateTime(){
        if($turn==0 && $timeA>=0 && !$kraj){
            
        $("#counter").html("<p style='font-size:55px; text-align:center'>"+$timeA+"</p>");
        if($timeA==0) { alert("Pobednik je igrac: "+($turn+2)); $kraj=true;  clearInterval(updateTime);}
        $timeA--;
        }
        else if($timeB>=0 && !$kraj){
            $("#counter").html("<p style='font-size:55px; text-align:center'>"+$timeB+"</p>");
            if($timeB==0) { alert("Pobednik je igrac: "+($turn)); $kraj=true; clearInterval(updateTime);}
        $timeB--;

        }
    }
    function inicijalizujKombinacije(){
        $("#Igrac").html("Na potezu je igrac 1");
        $zadataKombinacijaA=JSON.parse(localStorage.getItem("kombinacijaA"));
        $zadataKombinacijaB=JSON.parse(localStorage.getItem("kombinacijaB"));
        $first=true;
        $kraj=false;

    }
    $("#nova").click(function(){
        localStorage.setItem('kombinacijaA', null);
        localStorage.setItem('kombinacijaB', null);
        
        window.location.href="skocko-uputstvo.html";
    })
    function proveriPokusaje(){
        if($brojPokusajaA==7 && $k){
            $k=false;
            for(let i=0;i<4;i++){
                $("#k"+i).append(
                    $("<img>").attr("src",$("img[name='"+$zadataKombinacijaA[i]+"']").attr("src")).attr("class", "znak")
                )
            }
        }
        else if($brojPokusajaB==7){
            for(let i=0;i<4;i++)
                $("#k"+i+" img").remove();
            for(let i=0;i<4;i++){
                $("#k"+i).append(
                    $("<img>").attr("src",$("img[name='"+$zadataKombinacijaB[i]+"']").attr("src")).attr("class", "znak")
                )
            }
            alert("Ishod je neresen");
        
            $kraj=true;
        
    }
}
})