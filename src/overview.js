import React, { useEffect, useState } from 'react';
//import ReactPaginate from 'react-paginate';
import './Overview.css';

/*function Overview() {
  const [data, setData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 13;


  useEffect(() => {
    fetch('http://10.138.212.98:8080/buildinfo/get-machinfo/11111/')
      .then((response) => response.json())
      .then((data) => setData(data.pipelines))
      .catch((error) => console.error(error));

    fetch('http://10.138.212.98:8080/buildinfo/projects')
      .then((response) => response.json())
      .then((data) => setProjectData(JSON.parse(data.data)))
      .catch((error) => console.error(error));

      const sampleData = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
      setData(sampleData);

      const sampleProjectData = Array.from({ length: 100 }, (_, i) => ({
      project_number: i + 1,
      project_name: `Project ${i + 1}`,
    }));
    setProjectData(sampleProjectData);
  }, []);

  useEffect(() => {
  const combinedData = data.map((item) => {
    const matchingProject = projectData.find((project) => project.project_number === item.project__project_number);
    return {
      ...item,
      project_name: matchingProject ? matchingProject.project_name : '',
      };
    });
    
    const filtered = combinedData.filter((item) =>
      Object.values(item).some(
        (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredData(filtered)
  }, [data, projectData, searchTerm]);

  const handleSearch = () => {
    console.log(filteredData);
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedData = filteredData.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

  const [activeTab, setActiveTab] = useState('table');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [baselineData, setBaselineData] = useState([]);
  useEffect(() => {
    fetch('http://10.138.212.98:8080/buildinfo/get-baseline')
      .then((response) => response.json())
      .then((data) => setBaselineData(data.pipelines))
      .catch((error) => console.error(error));
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'table':
        return (
          <div>
          <div className="filter-search-container">
            <input
              className="filter-input"
              type="text"
              placeholder="Search by Project Name, Project Number, or Machine IP"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
            <button className="search-button" onClick={handleSearch}>Search</button>
          </div>
            <table>
            <thead>
              <tr>
              <th>Project Number</th>
              <th>Project Name</th>
              <th>Machine IP</th>
              <th>Machine Cores</th>
              <th>Machine Name</th>
              <th>Machine RAM</th>
              <th>Machine Workspace</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                <td>{item.project__project_number}</td>
                <td>{item.project_name}</td>
                <td>{item.machine_ip}</td>
                <td>{item.machine_cores}</td>
                <td>{item.machine_name}</td>
                <td>{item.machine_ram}</td>
                <td>{item.machine_ws}</td>
                </tr>
              ))}
            </tbody>
            </table>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
          </div>
        );
      case 'gap':
        return (
          <div>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Number</th>
            <th>Android Version</th>
            <th>Chipset</th>
          </tr>
        </thead>
        <tbody>
          {baselineData.map((item, index) => (
            <tr key={index}>
              <td>
                {projectData.find((project) => project.project_number === item.project__project_number)?.project_name || 'N/A'}
              </td>
              <td>{item.project__project_number}</td>
              <td>{item.baseline || 'N/A'}</td>
              <td>{item.chipset || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>        
        );
      default:
        return null;
    }
  };


  return (
    <div>
      {/* <h1>Machine Information</h1>    }
      <header class="App-header">
        <a href='http://10.138.212.98:8888/' className="app-logo">Visteon Software Factory</a>
      </header>  
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'table' ? 'active' : ''}`}
          onClick={() => handleTabClick('table')}
        >
          MachineInfo
        </div>
        <div
          className={`tab ${activeTab === 'gap' ? 'active' : ''}`}
          onClick={() => handleTabClick('gap')}
        >
          Baseline
        </div>
      </div>
      {renderTabContent()}
    </div>
  );
}

*/

function Overview(){
  <div>
    <h1>WELCOME</h1>
  </div>
}

export default Overview;
