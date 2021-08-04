prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:350,
    height:300,
    img_format: "png",
    png_quality:90
});

Webcam.attach('#camera');
camera = document.getElementById("camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/NGg3m2Ik3/model.json', modelLoaded);

function modelLoaded()
{
    console.log('modelLoaded');
}

function speak()
{
    var synth = window.speechSynthesis;

    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "And the second prediction is" + prediction_2;

     var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
     synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
{
    console.log(error);
}

else
{
    console.log(results);

    document.getElementById('result_emotion_name').innerHTML = results[0].label;
    document.getElementById('result_emotion_name2').innerHTML = results[1].label;

    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();

    if(results[0].label == "Thumbs up" )
    {
        document.getElementById("update_emojy").innerHTML = "👍";
    }
    if(results[0].label == "Victory" )
    {
        document.getElementById("update_emojy").innerHTML = "✌";
    }
    if(results[0].label == "Amazing" )
    {
        document.getElementById("update_emojy").innerHTML = "👌";
    }
 //Prediction 2 
 if(results[1].label == "Thumbs up" )
 {
     document.getElementById("update_emojy2").innerHTML = "👍";
 }
 if(results[1].label == "Victory" )
 {
     document.getElementById("update_emojy2").innerHTML = "✌";
 }
 if(results[1].label == "Amazing" )
 {
     document.getElementById("update_emojy2").innerHTML = "👌";
 }
}}