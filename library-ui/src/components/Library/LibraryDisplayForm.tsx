import React, { ChangeEvent } from "react";
import {
  Modal,
  Form,
  Button,
  Input,
  InputNumber,
  Select,
  Checkbox,
} from "antd";

import { library } from "../../shared/interfaces/library.interface";
const { Option } = Select;

interface Props {
  toogleShow: () => void;
  show: boolean;
  repos: any[];
  vulnerabilityTypes: any[];
  createLibDisabled: boolean;
  setName: (e: ChangeEvent<HTMLInputElement>) => void;
  setAuthor: (e: ChangeEvent<HTMLInputElement>) => void;
  setDownloads: (value: string | number | undefined) => void;
  setRepo: (value: number) => void;
  setTempLibVersionName: (e: ChangeEvent<HTMLInputElement>) => void;
  setVulnerabilitieOfVersion: (values: any) => void;
  saveLibrary: (id: number | undefined) => void;
  library: library;
}
const LibraryDisplayForm: React.FC<Props> = (props: Props) => {
  const vulnerabilitiesCheckbox: {
    label: string;
    value: string;
  }[] = props.vulnerabilityTypes.map((vul) => ({
    label: vul.name,
    value: vul.id,
  }));
  let title;
  if (props.library.id === undefined) {
    title = "Add a New Library";
  } else {
    title = "edit " + props.library.name;
  }
  return (
    <React.Fragment>
      <Modal
        title={title}
        visible={props.show}
        onCancel={props.toogleShow}
        footer={false}
      >
        <Form layout="vertical" requiredMark={true}>
          <Form.Item label="Name" required>
            <Input value={props.library.name} onChange={props.setName} />
          </Form.Item>
          <Form.Item label="Author" required>
            <Input value={props.library.author} onChange={props.setAuthor} />
          </Form.Item>
          <Form.Item label="Downloads">
            <InputNumber
              value={props.library.downloads}
              type="number"
              min={0}
              onChange={props.setDownloads}
            />
          </Form.Item>
          <Form.Item label="Repository" required>
            <Select
              value={props.library.repository!.id}
              onChange={props.setRepo}
            >
              {props.repos.map((repo, index) => (
                <Option key={repo.id} value={repo.id}>
                  {repo.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Version" required>
            <Input
              placeholder="Version Name"
              value={props.library.versions![0].name}
              onChange={props.setTempLibVersionName}
            />
            <p>Known Vulnerabilities</p>
            <Checkbox.Group
              options={vulnerabilitiesCheckbox}
              onChange={props.setVulnerabilitieOfVersion}
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={props.createLibDisabled}
              htmlType="button"
              onClick={() => props.saveLibrary(props.library.id)}
              type="primary"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default LibraryDisplayForm;
