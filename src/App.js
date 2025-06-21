import "./styles.css";
import { Table } from "antd";
export default function App() {
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
    </div>
  );
}
