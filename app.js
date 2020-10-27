class DrumKit{
    constructor(){
    this.pads = document.querySelectorAll('.pad');
    this.playBtn = document.querySelector('.play')
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    }

    activePad(){
        this.classList.toggle('active');
    }
    repeat(){
        let step = this.index % 8;
        const activePads = document.querySelectorAll(`.b${step}`)
        // loop over pads

        activePads.forEach(pad =>{
            pad.style.animation = 'playTrack 0.3s alternate ease-in-out 2';

            //Checking if our current pad contains active class
            if(pad.classList.contains('active')){

                //if yes then check which sound is assigned to it and playing it 
                if(pad.classList.contains('kick-pad')){
                    this.kickAudio.play()
                     //setting current time to 0 in order to allow playing multiple sounds at the same time otherwise it the sound of the previous will overlap with the next sound
                    this.kickAudio.currentTime = 0
                }
                if(pad.classList.contains('snare-pad')){
                    this.snareAudio.play()
                    this.snareAudio.currentTime = 0

                }
                if(pad.classList.contains('hihat-pad')){
                    this.hihatAudio.play()
                    this.hihatAudio.currentTime = 0

                }
               
            }
        })
        this.index++;
    }

    start(){

        const interval = (60/this.bpm)*1000
        if(!this.isPlaying){
            this.isPlaying=setInterval(() => {
                this.repeat()
            },interval);
        }
        else{
            //Clear interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;

        }
      
    }


    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText= "Stop";
            this.playBtn.classList.add("active");
        }else{
            this.playBtn.innerText= "Play";
            this.playBtn.classList.remove("active");
        }
    }
}


const drumKit = new DrumKit();
drumKit.pads.forEach(pad =>{
    pad.addEventListener('click',drumKit.activePad);
    pad.addEventListener('animationend',function(){
        this.style.animation = "";
    });
})
drumKit.playBtn.addEventListener('click',()=>{
    drumKit.updateBtn();
    drumKit.start();
})