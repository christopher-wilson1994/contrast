import React from "react";
import { library } from "../../shared/interfaces/library.interface";

import { Descriptions, Tag } from "antd";
interface Props {
  library: library;
}
const FullLibraryInfo: React.FC<Props> = (props: Props) => {
  return (
    <Descriptions title="Library Information" bordered>
      <Descriptions.Item label="Name">{props.library.name}</Descriptions.Item>
      <Descriptions.Item label="Author">
        {props.library.author}
      </Descriptions.Item>
      <Descriptions.Item label="Downloads">
        {props.library.downloads}
      </Descriptions.Item>
      <Descriptions.Item label="Version Name" span={2}>
        {props.library.versions![0].name}
      </Descriptions.Item>
      <Descriptions.Item label="Known Vulnerabilities" span={2}>
        {props.library.versions![0].vulnerabilities!.map((vul, index) => {
          return (
            <Tag key={index} color={"red"}>
              {vul.name}
            </Tag>
          );
        })}
      </Descriptions.Item>
      <Descriptions.Item label="Repository Name" span={2}>
        {props.library.repository!.name}
      </Descriptions.Item>
      <Descriptions.Item label="Repository URL" span={3}>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={props.library.repository!.url}
        >
          {props.library.repository!.url}
        </a>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default FullLibraryInfo;
