import React, { useState, useEffect, ChangeEvent } from "react";
import {
  fetchLibraries,
  addLibrary,
  deleteLibraryById,
  updateLibraryById,
} from "../../service/LibraryService";
import { fetchRepositories } from "../../service/RepositoryService";
import { fetchVulnerabilityTypes } from "../../service/VulnerabilityService";
import { library } from "../../shared/interfaces/library.interface";

import {
  Table,
  Space,
  Col,
  Button,
  Row,
  notification,
  Input,
  Typography,
  Divider,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import AddLibrary from "../../components/Library/LibraryDisplayForm";
import FullLibraryInfo from "../../components/Library/FullLibraryInfo";

import StatsRow from "../../components/Library/StatsRow";

const { Title } = Typography;

const Libraries: React.FC = () => {
  const [libs, setLibs] = useState([]);
  const [filteredLibs, setFilteredLibs] = useState([]);

  const [repos, setRepos] = useState([]);
  const [vulnerabilityTypes, setVulnerabilityTypes] = useState([]);
  const [createLibDisabled, setCreateLibDisabled] = useState(true);
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [totalVulnerabilies, setTotalVulnerabilies] = useState(0);
  const [tempLib, setTempLib] = useState<library>({
    versions: [{}],
    repository: {},
    downloads: 0,
  });

  const [showAddLibrary, setShowAddLibrary] = useState(false);

  const toggleModal = () => {
    setShowAddLibrary(!showAddLibrary);
  };

  const showAddLibModal = () => {
    setTempLib({
      versions: [{}],
      repository: {},
      downloads: 0,
    });
    toggleModal();
  };

  const showEditLibModal = (lib: library) => {
    const editLib = { ...lib };
    setTempLib(editLib);
    toggleModal();
  };

  //---------------callback functions for LibraryDisplayForm---------------
  const setTempLibName = (e: ChangeEvent<HTMLInputElement>) => {
    let lib = { ...tempLib };
    lib.name = e.target.value;
    setTempLib(lib);
  };

  const setTempLibAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    let lib = { ...tempLib };
    lib.author = e.target.value;
    setTempLib(lib);
  };

  const setTempLibDownloads = (count: any) => {
    console.log(count);
    let lib = { ...tempLib };
    lib.downloads = count;
    setTempLib(lib);
  };

  const setTempLibRepositry = (value: number) => {
    let lib = { ...tempLib };
    lib.repository!.id = value;
    setTempLib(lib);
  };

  const setTempLibVersionName = (e: ChangeEvent<HTMLInputElement>) => {
    let lib = { ...tempLib };
    lib.versions![0].name = e.target.value;
    setTempLib(lib);
  };
  const setTempLibVulnerabilitieOfVersion = (idValues: number[]) => {
    let version = tempLib.versions![0];
    version.vulnerabilities = idValues.map((vulId) => ({ id: vulId }));

    let lib = { ...tempLib };
    lib.versions = [version];
    setTempLib(lib);
  };

  const addOrUpdatetempLibrary = async (id: number | undefined) => {
    if (id === undefined) {
      addTempLibrary();
    } else {
      editLibrary(id);
    }
  };

  //-----------end callback functions for LibraryDisplayForm-----------

  //--------------------CRUD operations for library--------------------
  const addTempLibrary = async () => {
    try {
      await addLibrary(tempLib);
      setTempLib({ versions: [{}], repository: {} });
      showAddLibModal();
      notification.success({
        message: `Library Successfully Added`,
        placement: "bottomRight",
      });
      const updatedLibs = await fetchLibraries();
      setLibs(updatedLibs);
    } catch (error) {
      notification.error({
        message: `Library failed to be Added`,
        placement: "bottomRight",
      });
    }
  };

  const editLibrary = async (id: number) => {
    try {
      await updateLibraryById(id, tempLib);
      setTempLib({ versions: [{}], repository: {} });
      showAddLibModal();
      notification.success({
        message: `Library Successfully Updated`,
        placement: "bottomRight",
      });
      const updatedLibs = await fetchLibraries();
      setLibs(updatedLibs);
    } catch (error) {
      notification.error({
        message: `Library Successfully Updated`,
        placement: "bottomRight",
      });
    }
  };

  const deleteLibrary = async (id: number) => {
    try {
      await deleteLibraryById(id);
      notification.success({
        message: `Library was delete`,
        placement: "bottomRight",
      });
      const updatedLibs = await fetchLibraries();
      setLibs(updatedLibs);
    } catch (error) {
      notification.error({
        message: `Deletion of library failed`,
        placement: "bottomRight",
      });
    }
  };
  //------------------ END CRUD operations for library------------------

  const validatetempLibrary = () => {
    if (tempLib.name === undefined || tempLib.name.length === 0) {
      setCreateLibDisabled(true);
      return;
    }
    if (tempLib.author === undefined || tempLib.author.length === 0) {
      setCreateLibDisabled(true);
      return;
    }

    if (tempLib.repository!.id === undefined || tempLib.repository!.id === 0) {
      setCreateLibDisabled(true);
      return;
    }

    if (tempLib.versions![0].name === undefined || tempLib.name.length === 0) {
      setCreateLibDisabled(true);
      return;
    }

    console.log(JSON.stringify(tempLib, null, 2));
    setCreateLibDisabled(false);
  };

  //filter results on name
  useEffect(() => {
    if (nameSearchTerm.length === 0) {
      setFilteredLibs(libs);
    } else {
      const filtered = libs.filter((lib: library) =>
        lib.name!.toLowerCase().includes(nameSearchTerm.toLowerCase())
      );
      setFilteredLibs(filtered);
    }
  }, [nameSearchTerm, libs]);

  //update vulnerability count
  useEffect(() => {
    let vulnerabilityCount = 0;

    libs.forEach((lib: library) =>
      lib.versions!.forEach(
        (version) => (vulnerabilityCount += version.vulnerabilities!.length)
      )
    );

    setTotalVulnerabilies(vulnerabilityCount);
  }, [libs]);

  useEffect(() => {
    validatetempLibrary();
  }, [tempLib]);

  //load data on page load
  useEffect(() => {
    async function getData() {
      try {
        const fetchedLibs = await fetchLibraries();
        setLibs(fetchedLibs);
        const fetchedRepos = await fetchRepositories();
        setRepos(fetchedRepos);
        const fetchedVulTypes = await fetchVulnerabilityTypes();
        setVulnerabilityTypes(fetchedVulTypes);
      } catch (error) {
        notification.error({
          message: `Failed to fetch data`,
          placement: "bottomLeft",
        });
      }
    }
    getData();
  }, []);

  //antd table definition
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // eslint-disable-next-line react/display-name
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Repository",
      dataIndex: "repository",
      key: "repository",
      // eslint-disable-next-line react/display-name
      render: (repo: any) => (
        <a rel="noopener noreferrer" target="_blank" href={repo.url}>
          {repo.name}
        </a>
      ),
    },
    {
      title: "Downloads",
      dataIndex: "downloads",
      key: "downloads",
    },
    {
      title: "# of Known vulnerabilities (all versions)",
      dataIndex: "versions",
      key: "versions",
      // eslint-disable-next-line react/display-name
      render: (versions: any[]) => {
        let count = 0;
        versions.forEach(
          (version) => (count += version.vulnerabilities.length)
        );
        let countColor = "green";
        if (count > 0) {
          countColor = "red";
        }
        return <p style={{ color: countColor }}>{count}</p>;
      },
    },
    {
      title: "# of Versions",
      dataIndex: "versions",
      key: "versions",
      // eslint-disable-next-line react/display-name
      render: (versions: any[]) => <p>{versions.length}</p>,
    },
    {
      title: "Actions",
      key: "id",
      // eslint-disable-next-line react/display-name
      render: (lib: library) => (
        <Row>
          <Space>
            <Button onClick={() => showEditLibModal(lib)} type="primary">
              <EditOutlined />
            </Button>
            <Button
              onClick={() => deleteLibrary(lib.id!)}
              type="primary"
              danger
            >
              <DeleteOutlined />{" "}
            </Button>
          </Space>
        </Row>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Divider orientation="center">
        <Title>Libraries</Title>
      </Divider>
      <StatsRow
        libraryCount={libs.length}
        vulnerabilitiesCount={totalVulnerabilies}
      />
      <br />
      <Row gutter={24}>
        <Col>
          <Button type="primary" onClick={showAddLibModal}>
            Add Library
            <PlusOutlined />
          </Button>
          <AddLibrary
            library={tempLib}
            setName={setTempLibName}
            setAuthor={setTempLibAuthor}
            setDownloads={setTempLibDownloads}
            setRepo={setTempLibRepositry}
            setTempLibVersionName={setTempLibVersionName}
            setVulnerabilitieOfVersion={setTempLibVulnerabilitieOfVersion}
            saveLibrary={addOrUpdatetempLibrary}
            createLibDisabled={createLibDisabled}
            repos={repos}
            vulnerabilityTypes={vulnerabilityTypes}
            show={showAddLibrary}
            toogleShow={toggleModal}
          />
        </Col>
        <Col>
          <Input
            placeholder="Filter on name.."
            onChange={(e) => setNameSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <Table
        expandable={{
          // eslint-disable-next-line react/display-name
          expandedRowRender: (record: library) => (
            <FullLibraryInfo library={record} />
          ),
        }}
        rowKey="id"
        columns={columns}
        dataSource={filteredLibs}
      />
    </React.Fragment>
  );
};

export default Libraries;
