import "./styles.css";
import React, { useState } from "react";
import { Table, Button, Input, Select, Space } from "antd";
import Plot from 'react-plotly.js';
import * as XLSX from 'sheetjs-style';
import { DownloadOutlined } from "@ant-design/icons";
export default function App() {
  const [formData, setFormData] = useState({
    InputAtomic: "",
    InputEnergy: "",
  });
  const [result, setResult] = useState('');
  

  const [selectedSource, setSelectedSource] = useState("");
  const [transitionType, setTransitionType] = useState("");
  const [plotData, setPlotData] = useState([]);
  const [energyPlotData, setEnergyPlotData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const dataSource = [
    {
      key: "1",
      source: "Rose",
      zrange: "10-92",
      Erange: "0.3-5k",
      comments:
        "Point nucleus estimation with consistent sign error in the interference particle parameter hence only pure b2 are adopted. Z=[10,20,30,40,54,64,72,78,83,88,92]",
    },
    {
      key: "2",
      source: "Sliv",
      zrange: "81-92",
      Erange: "0.2-2k",
      comments: "Includes finite nuclei size and screening effect correction but limited atomic range. Z=[81,84,88,92]",
    },
    {
      key: "3",
      source: "Purdue",
      zrange: "60-96",
      Erange: "0.1-1k",
      comments:
        "limited energy range, calculation includes finite nuclei size and screening effect, data not well scanned. Z=[60,64,68,72,76,80,84,88,92,96]",
    },
    {
      key: "4",
      source: "Caltech",
      zrange: "31-103",
      Erange: "30-1500keV",
      comments:
        "large list of data covering every proton number in the range, results are similar to Rose.  ",
    },
  ];

  const columns = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "Atomic Range(Z)",
      dataIndex: "zrange",
      key: "zrange",
    },
    {
      title: "Energy Range",
      dataIndex: "Erange",
      key: "Erange",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
    },
  ];
  const CalcB2 = (Z,Energy) => {
  	 if (selectedSource === "Rose" ) {
  	 	if(transitionType === "E1"){
  	 	const res = 1-(2.99467+0.00531914*Z-1.91083E-06*Z*Z )/( 1 + ( -0.0259849 + 0.00979738*Z + -1.52332E-05*Z*Z )*Energy + ( 0.519404 + -0.00690479*Z + 1.29853E-05*Z*Z )*Energy*Energy );
  	 	
        	return res;}
        	
        	else if(transitionType === "E2"){
        	const res = (0.886352 + 0.00704057*Z -5.94772E-05*Z*Z) + (1.11097 + 0.00393828*Z + -7.2124E-05*Z*Z)*Math.exp(-(0.405355 + 0.00492474*Z + 0.000135948*Z*Z)*Energy);
        	
        	return res;
        	}
        	else if(transitionType === "M1"){
        	const res = 1 - ( -0.172538 + 0.0242002*Z + 7.23593E-05*Z*Z +-2.09992E-06*Z*Z*Z) / ( 1 + ( 1.72879 + 0.00342877*Z + -0.00040695*Z*Z +1.92715E-06*Z*Z*Z)*Energy + ( 0.138227 + -0.00432782*Z + 1.11273E-06*Z*Z+3.10188E-07*Z*Z*Z )*Energy*Energy );
        	
        	return res;
        	
        	
        	}
        	else if(transitionType === "M2"){
        	const res = 1-(0.0853597+-0.0146173*Z+0.000100801*Z*Z )/( 1 + ( 4.02747 +-0.063367*Z + 0.000241494*Z*Z )*Energy + ( -0.174787 + 0.00116221*Z + 5.75733E-06*Z*Z )*Energy*Energy );
        	
        	return res;
        	
        	}
        	else if(transitionType === "E1M2"){
        	
        	return 0;}
        	else if(transitionType === "M1E2"){
        	
        	return 0;}
        	
  	 
  	 }
  	 else if(selectedSource === "Sliv" ){
  	 	if(transitionType === "E1"){
  	 	const res = (0.712156 + -0.0679094*Z +  0.000396655*Z*Z) + (-4.30053 +0.131271*Z +-0.000748696*Z*Z)*Energy + (2.20455+ -0.0547943*Z + 0.000302655*Z*Z)*Energy*Energy;
  	 	
        	return res;
  	 	}
  	 	else if(transitionType === "M1"){
  	 	const res = (0.361758 + -0.0137605*Z +  9.28387E-05*Z*Z) + (2.78739 +-0.0401454*Z +0.00013401*Z*Z)*Energy + (-0.67628+ 0.00913286*Z + -2.42634E-05*Z*Z)*Energy*Energy;
  	 	
        	return res;
  	 	}
  	 	else if(transitionType === "E2"){
  	 	const res = (1.73965 +-0.0149913*Z + 8.55179e-05*Z*Z) + (-7.93213 + 0.21189*Z + -0.00125302*Z*Z) * Math.exp(-( 3.15486 + -0.112671*Z + 0.00117014*Z*Z )*Energy );
  	 	
        	return res;
  	 	}
  	 	
  	 	else if(transitionType === "M2"){
  	 	const res = (-1.12435+ 0.0542586*Z + -0.00029845*Z*Z) + (-1.33959 + 0.0290025*Z+ -0.000163086*Z*Z)*Math.log(Energy) + (1.4374 + -0.034124*Z +0.000199177*Z*Z)*Energy;
  	 	
        	return res;
  	 	}
  	 	
  	 	else if(transitionType === "E1M2"){
  	 	const res = (1.45126+ -0.027491*Z + 0.000185757*Z*Z) + (1.0860 + -0.0236917*Z+ 0.000159989*Z*Z)*Math.log(Energy) + (-0.64565 + 0.0203983*Z +-0.00014887*Z*Z)*Energy;
  	 	
        	return res;
  	 	}
  	 	else if(transitionType === "M1E2"){
  	 	const res = (11.0284+ -0.248503*Z + 0.0014623*Z*Z) + (12.4428 +-0.297161*Z+0.00184527*Z*Z)*Math.log(Energy) + (-9.17208 + 0.223863*Z +-0.00138767*Z*Z)*Energy;
  	 	
        	return res;
  	 	}
  	 
  	 
  	 
  	 }
  	 
  	 else if(selectedSource === "Purdue" ){
  	 	if(transitionType === "E1"){
  	 	const res = 1 - ( 2.81012 + 0.0036971*Z ) / ( 1 + ( -0.409085 + 0.00918462*Z  )*Energy + ( 0.822086 + -0.00739632*Z  )*Energy*Energy );
  	 	
        	return res;
  	 	}
  	 	else if(transitionType === "M1"){
  	 	const res = 1 - ( -0.531788 + 0.0499879*Z+-0.000356032*Z*Z ) / ( 1 + ( 2.28383 + 5.37883E-05*Z+-0.00027077*Z*Z  )*Energy + ( -0.714478 + 8.21319E-07*Z+0.000100324*Z*Z  )*Energy*Energy )
  	 	
        	return res;
  	 	}
  	 	else if(transitionType ==="M2"){
  	 	const res = 1 + ( 0.0999781 + 0.0101438*Z+-7.04646E-05*Z*Z ) / ( 1 + ( 2.6442 + -0.0132958*Z +-0.000127168*Z*Z )*Energy + ( 1.04761 + -0.0403607*Z+0.000313587*Z*Z  )*Energy*Energy);
  	 	
        	return res;
  	 	}
  	 	else if(transitionType ==="E1M2"){
  	 	const res = 1 - ( 0.80964 + 0.00373756*Z+-2.09861E-06*Z*Z ) / ( 1 + ( -0.845433 + 0.0359096*Z+-0.000132749*Z*Z  )*Energy + ( 2.12379 + -0.0411186*Z+0.000172208*Z*Z  )*Energy*Energy );
  	 	
        	return res;
  	 	}
  	 	else if(transitionType ==="M1E2"){
  	 	const res = (-4.98698 + 0.132495*Z +-0.00077273*Z*Z)+(-1.64162 + 0.03581*Z +-0.000101889*Z*Z)*Math.log(Energy)+(5.4306+ -0.124017*Z +0.000653084*Z*Z)*Energy;
  	 	
  	 	return res;}
  	 	else if(transitionType ==="E2"){
  	 	const res = 1 - ( 2.4957 + -0.102702*Z+0.000744776*Z*Z ) / ( 1 + ( -15.156+ 0.431626*Z+-0.00293911*Z*Z  )*Energy + (19.4993 + -0.578513*Z+0.00450974*Z*Z  )*Energy*Energy );
  	 	
        	return res;}
  	 
  	 	
  	 }
  	 
  	 else if(selectedSource === "Caltech" ){
  	 Energy = Energy*511;
  	 if(transitionType === "E1"){
  	 const res = 1 - ( 2.83025 + 0.00501971*Z + -3.21012E-06*Z*Z ) / ( 1 + ( -0.000663078 + 2.68535E-05*Z + -7.81678E-08*Z*Z )*Energy + ( 2.89913E-06 + -4.72336E-08*Z + 1.83694E-10*Z*Z )*Energy*Energy );
  	 return res;
  	 
  	 }
  	 else if(transitionType ==="E2"){
  	 const base =Energy/ (719.309 + -2.23227*Z + -0.0423089*Z*Z);
  	 const expo = 2.92681 + -0.0227835*Z + 7.99467E-05*Z*Z;
  	 
  	 const res = (1.34372 + -0.0077455*Z + 4.70634E-05*Z*Z) + ((1.98531 - (1.34372 + -0.0077455*Z + 4.70634E-05*Z*Z)) / (1 + Math.pow(base, expo)));
  	 return res;
  	 
  	 }
  	 else if(transitionType ==="M1"){
  	 const base1 = Math.log(1 + Energy/([12]+[13]*Z));

  	 
  	 const res = (0.144236+-0.0156544*Z+0.000148269*Z*Z) + (1.41253+-0.00340098*Z+-0.000146766*Z*Z)*Math.log(1 + Energy/(24.7433+2.17371*Z)) +  (-0.576992+0.00154396*Z+8.50697E-05*Z*Z)*Math.pow(base1, 2) +(0.0460954+0.00137315*Z+-2.92565E-05*Z*Z)*Math.pow(base1, 3);
  	 return res;
  	 
  	 }
  	 else if(transitionType ==="M2"){
  	 const res = (1.51105 + 0.0083756*Z +-7.50033E-05*Z*Z)+(-0.115197 + 0.000112286*Z +6.63574E-06*Z*Z)*Math.log(Energy)+(0.000173621+ -4.2205E-06*Z +2.18643E-08*Z*Z)*Energy;
  	 return res;
  	 
  	 
  	 }
  	 else if(transitionType ==="E1M2"){
  	 const res = (0.125157 + 0.00119595*Energy +-6.76534E-07*Energy*Energy+1.03734E-10*Energy*Energy*Energy)+(-0.0414505 + 0.000138287*Energy +-1.09674E-07*Energy*Energy+4.59322E-11*Energy*Energy*Energy)*Math.log(Z)+(0.000388224+ -3.49532E-06*Energy +-2.45671E-10*Energy*Energy+2.71406E-13*Energy*Energy*Energy)*Z;
  	 return res;	
  	 
  	 
  	 }
  	 else if(transitionType ==="M1E2"){
  	 const res = (-0.232571 + -0.00245431*Z +2.44566E-05*Z*Z+-4.13881E-06*Z*Z*Z)+(0.0818815 + -0.000358571*Z +3.54821E-05*Z*Z+3.52075E-07*Z*Z*Z)*Math.log(Energy)+(0.000587701+ -4.52511E-06*Z +-9.1968E-08*Z*Z+2.46411E-10*Z*Z*Z)*Energy;
  	 return res;
  	 }
  	 
  	 
  	 
  	 }
  
  }
 
const fetchRawData = async (mainCalcData) => {
  try {
    const response = await fetch(process.env.PUBLIC_URL + '/' + selectedSource.toString() + '.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });

    const sheet = workbook.Sheets[formData.InputAtomic.toString()];
    if (!sheet) {
      setEnergyPlotData([mainCalcData]);
      return;
    }

    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    if (rows.length < 2) {
      setEnergyPlotData([mainCalcData]);
      return;
    }

    // Find the column index for the selected transition type
    const headerRow = rows[0];
    const transitionColIndex = headerRow.indexOf(transitionType);

    if (transitionColIndex === -1) {
      console.warn(`Transition type "${transitionType}" not found in sheet headers`);
      setEnergyPlotData([mainCalcData]);
      return;
    }

    const kVals = [], b2Vals = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const k = row[0];
      const b2 = row[transitionColIndex];

      if (!isNaN(k) && !isNaN(b2)) {
        if(selectedSource=="Caltech"){
        kVals.push(k); 
        }
        else{
        kVals.push(k * 511)}; // convert to keV}
        b2Vals.push(b2);
      }
    }

    if (kVals.length && b2Vals.length) {
      const rawData = {
        x: kVals,
        y: b2Vals,
        type: "scatter",
        mode: "lines+markers",
        name: `Theoretical. b2 (${transitionType}) at Z=${formData.InputAtomic}`,
        marker: { color: "red", symbol: "circle" },
      };
      setEnergyPlotData([mainCalcData, rawData]);
    } else {
      setEnergyPlotData([mainCalcData]);
    }

  } catch (err) {
    console.error("Failed to load Excel file:", err);
    setEnergyPlotData([mainCalcData]);
  }
};
 

  const handleCalculate = () => {
  const energyNum = parseFloat(formData.InputEnergy) / 511;
  const fixedZ = parseFloat(formData.InputAtomic);
  const fixedEnergy = energyNum;

  if (isNaN(fixedEnergy)) {
    setResult("Invalid energy input");
    return;
  }

  const Zs = [];
  const B2s = [];
  const Userb2 = CalcB2(fixedZ,fixedEnergy);

  for (let Z = 60; Z <= 100; Z++) {
    try {
      const b2 = CalcB2(Z, fixedEnergy);
      
      if (!isNaN(b2)) {
        Zs.push(Z);
        B2s.push(b2);
      }
    } catch (err) {
      console.warn(`Skipping Z=${Z}: ${err.message}`);
    }
  }

  setResult(`Estimated b2 value = ${Userb2} --- plotting b2 at constant energy and constant atomic number`);
  setPlotData([
    {
      x: Zs,
      y: B2s,
      type: 'scatter',
      mode: 'lines+markers',
      name: `Fitted b2(Z) at E = ${formData.InputEnergy} keV`,
    },
  ]);
  const atomicNum = parseFloat(formData.InputAtomic);
  if (isNaN(atomicNum)) {
    setResult("Invalid atomic number input for energy sweep");
    return;
  }

  const energieskeV = [];
  const b2s = [];

  for (let E = 10; E <= 2000; E += 10) {
    const energyInMe = E / 511;
    const b2 = CalcB2(atomicNum, energyInMe);
    if (!isNaN(b2)) {
      energieskeV.push(E);
      b2s.push(b2);
    }
  }

 
  const mainCalcData = {
  x: energieskeV,
  y: b2s,
  type: "scatter",
  mode: "lines+markers",
  name: `Fitted b2(E) at Z = ${atomicNum}`,
  marker: { color: 'blue' },
};
setEnergyPlotData(mainCalcData);
fetchRawData(mainCalcData);
  
};





















  return (
    <div className="App">
      <h1>Conversion Electron Particle Parameter Calculator</h1>
      <h2>Comparison of theoretical calculations for b2</h2>

      <Table dataSource={dataSource} columns={columns} pagination={false} />

      <div style={{ textAlign: "left", marginTop: 24 }}>
        <Space direction="vertical" size="middle">
          <Select
            showSearch
            placeholder="Select Source"
            optionFilterProp="label"
            onChange={(value) => {
              console.log("Selected Source:", value);
              setSelectedSource(value);
            }}
            options={[
              { value: "Rose", label: "Rose" },
              { value: "Sliv", label: "Sliv" },
              { value: "Purdue", label: "Purdue" },
              { value: "Caltech", label: "Caltech" },
            ]}
            style={{ width: 200 }}
          />

          <Select
            showSearch
            placeholder="Select Transition Type"
            optionFilterProp="label"
            onChange={(value) => {
              console.log("Selected Transition Type:", value);
              setTransitionType(value);
            }}
            options={[
              { value: "E1", label: "E1" },
              { value: "E2", label: "E2" },
              { value: "M1", label: "M1" },
              { value: "M2", label: "M2" },
              { value: "E1M2", label: "E1M2" },
              { value: "M1E2", label: "M1E2" },
            ]}
            style={{ width: 200 }}
          />

          <Input
            name="InputAtomic"
            addonBefore="Atomic Number"
            placeholder="Enter Proton Number"
            allowClear
            value={formData.InputAtomic}
            onChange={handleChange}
            style={{ width: 300 }}
          />

          <Input
            name="InputEnergy"
            addonBefore="Energy"
            placeholder="Enter Energy in keV"
            allowClear
            value={formData.InputEnergy}
            onChange={handleChange}
            style={{ width: 300 }}
          />

          <Button type="primary" onClick={handleCalculate}>
            Calculate
          </Button>
          
          <p>{result}</p>
        </Space>
        <p></p>
        {plotData.length > 0 && (
  <Plot
  data={plotData}
  layout={{
    width: 700,
    height: 400,
    title: `b2 vs Proton Number (Z) at constant energy`,
    xaxis: {
      title: {
        text: 'Proton Number (Z)',
        font: {
          family: 'Arial, sans-serif',
          size: 16,
          color: '#333'
        }
      }
    },
    yaxis: {
      title: {
        text: 'b2 Value',
        font: {
          family: 'Arial, sans-serif',
          size: 16,
          color: '#333'
        }
      }
    }
  }}
/>

)}   {energyPlotData.length > 0 && (
  <Plot
    data={energyPlotData}
    layout={{
      width: 700,
      height: 400,
      title: "b2 vs Energy (keV) at fixed Proton Number (Z)",
      xaxis: {
      title: {
        text: 'Energy(keV)',
        font: {
          family: 'Arial, sans-serif',
          size: 16,
          color: '#333'
        }
      }
    },
    yaxis: {
      title: {
        text: 'b2 Value',
        font: {
          family: 'Arial, sans-serif',
          size: 16,
          color: '#333'
        }
      }
    }
    }}
  />
)}


  
      </div>
      <div style={{ textAlign: "left", marginTop: 24 }}>
      <a href={process.env.PUBLIC_URL + '/' + selectedSource.toString() + '.xlsx'} download>
      <Button style={{ backgroundColor: '#fa8c16', borderColor: '#7cb305', color: 'white' }} type="primary" icon={<DownloadOutlined />}>
        Download Raw Data
      </Button>
      </a>
      </div>
    </div>

  );
}

