function Calculator(id){

	this.id=id;

	this.initProp();

	this.createDOM();

	this.createEvent();
}

Calculator.prototype.createDOM=function(){

	var calc=document.getElementById(this.id)
	if (calc==null) {
		alert("Відсутній контейнер з заданим id");
		return;
	}

	calc.classList.add("calculator");

	var sqrt=String.fromCharCode(8730);

	var lineButton2=[7,8,9,"/","C"];
	var lineButton3=[4,5,6,"*",sqrt];
	var lineButton4=["="];
	var lineButton5=[1,2,3,"-"];
	var lineButton6=[0,".","+"];

	var lineButton=null;

	for (var i = 1; i <= 6; i++) {

		var divline=document.createElement("div");
		divline.classList.add("line");
		calc.appendChild(divline);

		if (i==1) {
			for (var j = 1; j <= 2; j++) {
				var input=document.createElement("input");
				input.setAttribute("type","text");
				input.setAttribute("readonly","true");
				divline.appendChild(input)
				if (j==1) {
					input.classList.add("top");
				}
				else{
					input.classList.add("bottom");
					input.setAttribute("value",0);
				}
			}
		}
		else{
			switch(i){
				case 2:
				lineButton=lineButton2;
				break;
				case 3:
				lineButton=lineButton3;
				break;
				case 4:
				lineButton=lineButton4;
				break;
				case 5:
				lineButton=lineButton5;
				break;
				case 6:
				lineButton=lineButton6;
			}

			for (var j = 0; j <lineButton.length; j++) {
				var input=document.createElement("input");
				input.setAttribute("type","button");
				divline.appendChild(input);
				input.value=lineButton[j];
				if(input.value=="=")
				input.classList.add("equal");
				if(input.value=="0")
				input.classList.add("zero")
			}
		}
		
	}

}

Calculator.prototype.createEvent=function(){

	var calcSelector="#"+this.id+".calculator";
	var calc=document.querySelector(calcSelector);
	console.log(calcSelector);

	var tops="#"+this.id+" .top";
	var top=document.querySelector(tops);
	var bottoms="#"+this.id+" .bottom";
	var bottom=document.querySelector(bottoms);

	calc.onmouseover=function(event){
		var target=event.target;
		if (target.tagName !=="INPUT") return;
		if (target.getAttribute("type")=="text") return;
		target.classList.add("select");
	}
	calc.onmouseout=function(event){
		var target=event.target;
		target.classList.remove("select");
	}

	var self=this;

	calc.onclick=function(event){

		var target=event.target;
		if (target.tagName !=='INPUT')return;
		if (target.getAttribute ('type')=='text') return;

	//	alert(target.value);
		var btnValue=target.value;
		if (!isNaN(btnValue)) {
		self.numberClick(btnValue,bottom)
		return;
		}

		if (btnValue=='+'||btnValue=='-'||btnValue=='*'||btnValue=='/') {
			self.operationClick(btnValue,top,bottom);
			return;
		}
		if(btnValue=='='){
			self.equalClick(top,bottom);
			return;
		}
		if(btnValue=='C'){
			self.clearClick(top,bottom);
			return;
		}
		if(btnValue=='.'){
			self.pointClick(bottom);
			return;
		}
	}
}


Calculator.prototype.numberClick=function(btnValue,bottom){

	this.repeatOperation=false;

	if (this.replase || bottom.value=='0') {
		bottom.value=btnValue;
		this.replase=false;
	}
	else bottom.value+=btnValue; 

}

Calculator.prototype.operationClick=function(btnValue,top,bottom){

	if (this.repeatOperation) return;
	this.repeatOperation=false;
	top.value+=bottom.value+btnValue;

	if (this.operation=='') {
		this.memory=bottom.value;
	}
	else {
		this.memory=eval(this.memory + this.operation + bottom.value);
	}
		bottom.value=this.memory;
		this.operation=btnValue;
		this.replase=true;
}

Calculator.prototype.equalClick=function(top,bottom){
	top.value='';
	bottom.value=eval(this.memory + this.operation + bottom.value);
	this.initProp();
}
Calculator.prototype.clearClick=function(top,bottom){
	top.value='';
	bottom.value=0;
	this.initProp();
}

Calculator.prototype.pointClick=function(bottom){
	if (this.replase) {
		bottom.value='0.';
		this.replase=false;
		return;
	}
	var str=bottom.value;
	var pos = str.indexOf('.');
	if (pos !== -1) return;
	bottom.value+='.'
}


Calculator.prototype.initProp=function(top,bottom){

	this.replase=false;

	this.memory=0;

	this.repeatOperation=false;

	this.operation='';
}