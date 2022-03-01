$(document).ready(function(){
    $trenutnaKombinacija=[];
    $counter=0;
    $flag=true;
    $turn=0;
    $(".znak").click(function(){
       // alert($flag);
        if($flag){
        $trenutnaKombinacija[$counter]=$(this).attr("name");
        $("#"+$counter).append(
            $("<img>").attr("src", $(this).attr("src")).attr("class","znak")
        )
        $counter++;
        }
        if($counter==4) $flag=false;
    })

    $("#potvrdi").click(function(){
        if(!$flag){
            if($turn==0){
            localStorage.setItem("kombinacijaB", JSON.stringify($trenutnaKombinacija));
            $turn=1;
            $("#naslov").html("Igrac 2,unesi kombinaciju");
            for(let i=0;i<4;i++){
                $("#"+i+" img").remove();
            }
            $trenutnaKombinacija=[];
            $flag=true;
            $counter=0;
            }
            else{
                localStorage.setItem("kombinacijaA", JSON.stringify($trenutnaKombinacija));
                window.location.href="skocko-igra.html";
            }
        }
    })
    $("#zapocni").click(function(){
        localStorage.setItem('kombinacijaA', null);
        localStorage.setItem('kombinacijaB', null);
        window.location.href="skocko-podesavanja.html";
    })
})