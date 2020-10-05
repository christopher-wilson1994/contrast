import React from "react";
import { Row, Col, Card, Statistic } from "antd";

interface Props {
  libraryCount: number;
  vulnerabilitiesCount: number;
}
const StatsRow: React.FC<Props> = (props: Props) => {
  return (
    <div className="site-statistic-demo-card">
      <Row gutter={0}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Libraries"
              value={props.libraryCount}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Vulnerabilities"
              value={props.vulnerabilitiesCount}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatsRow;
