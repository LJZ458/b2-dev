import "./styles.css";
import React, { useState } from "react";
import { Table, Button, Input, Select, Space } from "antd";
import Plot from 'react-plotly.js';
const { Search } = Input;

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
        "consistent sign error in the interference particle parameter hence only pure b2 are adopted",
    },
    {
      key: "2",
      source: "Sliv",
      zrange: "81-92",
      Erange: "0.2-2k",
      comments: "limited atomic range",
    },
    {
      key: "3",
      source: "Purdue",
      zrange: "60-96",
      Erange: "0.1-1k",
      comments:
        "limited energy range, calculation includes finite nuclei size and screening effect, data not well scanned",
    },
    {
      key: "4",
      source: "Caltech",
      zrange: "31-103",
      Erange: "30-1500keV",
      comments:
        "large list of data covering every proton number in the range, results are similar to Rose",
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
  	 	const res = (1.4513+ -0.0275*Z + 0.0002*Z*Z) + (1.0860 + -0.0237*Z+ 0.0002*Z*Z)*Math.log(Energy) + (-0.6456 + 0.0204*Z +-0.0001*Z*Z)*Energy;
  	 	
        	return res;
  	 	}
  	 	else if(transitionType === "M1E2"){
  	 	const res = (11.0284+ -0.2485*Z + 0.0015*Z*Z) + (12.4428 +-0.2972*Z+ 0.0018*Z*Z)*Math.log(Energy) + (-9.1721 + 0.2239*Z +-0.0014*Z*Z)*Energy;
  	 	
        	return res;
  	 	}
  	 
  	 
  	 
  	 }
  	 
  	 else if(selectedSource === "Purdue" ){
  	 	if(transitionType === "E1"){
  	 	const res = 1 - ( 2.81012 + 0.0036971*Z ) / ( 1 + ( -0.409085 + 0.00918462*Z  )*Energy + ( 0.822086 + -0.00739632*Z  )*Energy*Energy );
  	 	
        	return res;
  	 	}
  	 	else if(transitionType === "M1"){
  	 	const res = 1 - ( -0.531788 + 0.0499879*Z+-0.000356032*Z*Z ) / ( 1 + ( 2.28383 + 5.37883e-05*Z+-0.00027077*Z*Z  )*Energy + ( -0.714478 + 8.21319e-07*Z+0.000100324*Z*Z  )*Energy*Energy )
  	 	
        	return res;
  	 	}
  	 	else if(transitionType ==="M2"){
  	 	const res = 1 + ( 0.0999781 + 0.0101438*Z+-7.04646e-05*Z*Z ) / ( 1 + ( 2.6442 + -0.0132958*Z +-0.000127168*Z*Z )*Energy + ( 1.04761 + -0.0403607*Z+0.000313587*Z*Z  )*Energy*Energy);
  	 	
        	return res;
  	 	}
  	 	else if(transitionType ==="E1M2"){
  	 	const res = 1 - ( 0.80964 + 0.00373756*Z+-2.09861e-06*Z*Z ) / ( 1 + ( -0.845433 + 0.0359096*Z+-0.000132749*Z*Z  )*Energy + ( 2.12379 + -0.0411186*Z+0.000172208*Z*Z  )*Energy*Energy );
  	 	
        	return res;
  	 	}
  	 	else if(transitionType ==="E1M2"){return 0;}
  	 	else if(transitionType ==="E2"){return 0;}
  	 
  	 	
  	 }
  
  }
 

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
      name: `b2(Z) at E = ${formData.InputEnergy} keV`,
    },
  ]);
  const atomicNum = parseFloat(formData.InputAtomic);
  if (isNaN(atomicNum)) {
    setResult("Invalid atomic number input for energy sweep");
    return;
  }

  const energieskeV = [];
  const b2s = [];

  for (let E = 10; E <= 1000; E += 10) {
    const energyInMe = E / 511;
    const b2 = CalcB2(atomicNum, energyInMe);
    if (!isNaN(b2)) {
      energieskeV.push(E);
      b2s.push(b2);
    }
  }

  
  setEnergyPlotData([
    {
      x: energieskeV,
      y: b2s,
      type: "scatter",
      mode: "lines+markers",
      name: `b2(E) at Z = ${atomicNum}`,
    },
  ]);
  
  
  
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
    </div>
  );
}

