import "./styles.css";
import { Button, Input, Select, Space } from 'antd';
import { Table } from "antd";
const { Search } = Input;

export default function App() {
  const onChange = value => {
  console.log(`selected ${value}`);
};
  const onSearch = value => {
  console.log('search:', value);
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
  return (
    <div className="App">
      <h1>Conversion Electron Particle Parameter Calculator</h1>
      <h2>Comparison of theorectical calculations for b2</h2>
      <Table dataSource={dataSource} columns={columns} />;
      <div style={{ textAlign: 'left', marginBottom: 16 }}>
      <Select
    showSearch
    placeholder="Select Source"
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    options={[
      {
        value: 'Rose',
        label: 'Rose',
      },
      {
        value: 'Sliv',
        label: 'Sliv',
      },
      {
        value: 'Purdue',
        label: 'Purdue',
      },
      {
        value: 'Caltech',
        label: 'Caltech',
      },

    ]}
  />
    <Select
    showSearch
    placeholder="Select Transition Type"
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    options={[
      {
        value: 'E1',
        label: 'E1',
      },
      {
        value: 'E2',
        label: 'E2',
      },
      {
        value: 'M1',
        label: 'M1',
      },
      {
        value: 'M2',
        label: 'M2',
      },
      {
        value: 'E1M2',
        label: 'E1M2',
      },
      {
        value: 'M1E2',
        label: 'M1E2',
      },

    ]}
  />
      <Space.Compact>
      <Input addonBefore="Atomic Number" placeholder="Enter Proton Number" allowClear />
       </Space.Compact>

    <Space.Compact>
      <Input addonBefore="Energy" placeholder="Enter Energy in keV" allowClear />
    </Space.Compact>
    </div>
    </div>
  );
}
