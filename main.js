	var dedns="167.86.91.171";	
	var nydns="66.94.105.229";	
	var idkdns="213.109.163.210";
	var lastdns="92.60.37.102";
	document.getElementById("ip1").value=dedns;
	document.getElementById("ip2").value=nydns;
	document.getElementById("ip3").value=idkdns;
	document.getElementById("ip4").value=lastdns;

	/*
	var proxysettings=document.getElementById("proxysettings");
	var proxy=document.getElementById("proxy");
	proxy.onchange=function (){
		if (proxy.value!="direct"){
			proxysettings.style.display="flex";
		} else {
			proxysettings.style.display="none";
		}
	}
	*/
 
	var advanced=document.getElementById("advanced");
	advanced.addEventListener("animationend",()=>{
		advanced.style.animation="none";
		inprogress=false;
		if (advanced.dataset.pos=="up"){
			advanced.style.top="0%";
			document.getElementById("advancedbutton").innerText="Advanced -";
		} else if (advanced.dataset.pos=="down"){
			document.getElementById("advancedbutton").innerText="Advanced +";
			advanced.style.top="100%";
		} else {
			alert("error");
		}
	});
	var inprogress=false;
	function adv(){
		if (inprogress==false){
			inprogress=true;
			if (advanced.dataset.pos=="down"){
				advanced.style.animation="0.5s linear slideup";
				advanced.dataset.pos="up";
			} else if (advanced.dataset.pos=="up"){
				advanced.style.animation="0.5s linear slidedown";
				advanced.dataset.pos="down";
			} else {
				alert("error");
			}
		}
	}
	
	document.getElementById("button").style.left=window.innerWidth/2-document.getElementById("button").offsetWidth/2+"px";
	document.getElementById("credits").style.left=window.innerWidth/2-document.getElementById("credits").offsetWidth/2+"px";
	async function load(){
		var zip = new JSZip();
		
		var onc={ Type: "UnencryptedConfiguration", NetworkConfigurations: [] };
		var nameservers=[document.getElementById("ip1").value,document.getElementById("ip2").value,document.getElementById("ip3").value,document.getElementById("ip4").value];
		for (var i=0;i<4;i++){
			if (i==0){
				if (nameservers[i]==""){
					nameservers[i]=dns;
				}
			}
			if (nameservers[i]==""){
				nameservers[i]="0.0.0.0";
			}
		}
		var input=document.getElementById("input");
		var network = JSON.parse(input.value);

		if (!network.GUID || !network.Name || !network.WiFi){
			alert("please read the instructions carefully.");
		} else {
			let configuration = {
				GUID: network.GUID,
				Metered: document.getElementById("caub").checked,
				Name: network.Name,
				Type: "WiFi",
				WiFi: {
					AutoConnect: true,
					SSID: network.Name,
					Security: "None",
				},
				NameServersConfigType:"Static",
				StaticIPConfig:{
					NameServers:nameservers
				},
				ProxySettings:{
					Type:"Direct"
				}
			}
			onc.NetworkConfigurations.push(configuration);
			zip.file("kill.onc",JSON.stringify(onc));
	
			var onc2={ Type: "UnencryptedConfiguration", NetworkConfigurations: [] };
	
			let configuration2 = {
				GUID: network.GUID,
				Metered: false,
				Name: network.Name,
				Type: "WiFi",
				WiFi: {
					AutoConnect: true,
					SSID: network.Name,
					Security: "None",
				},
				NameServersConfigType:"DHCP",
				IPAddressConfigType: "DHCP",
				StaticIPConfig:{
					NameServers:[]
				},
				ProxySettings:{
					Type:"Direct"
				}
			}
			onc2.NetworkConfigurations.push(configuration2);
			zip.file("revive.onc",JSON.stringify(onc2));
	
			zip.generateAsync({type:"blob"}).then(function (content) {
			      saveAs(content, "network.zip");
			});
			document.getElementById("started").style.display="none";
			document.getElementById("input").style.display="none";
			document.getElementById("button").style.display="none";
			document.getElementById("finished").style.display="inline-block";
			document.getElementById("advanced").style.display="none";
			document.getElementById("advancedbutton").style.display="none";
		}
	}


	function download(object, fileName) {
		let link = document.createElement("a");
		link.href = URL.createObjectURL(new Blob([JSON.stringify(object)]));
		link.download = fileName;
		link.click().remove();
	}
