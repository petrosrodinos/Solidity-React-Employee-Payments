import { Tabs, Row, Col } from "antd";
import { FaUserFriends } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { GrUserSettings } from "react-icons/gr";
import UserTable from "./Table";
import AddEmployee from "./AddEmployee";
import Account from "./Account";

const { TabPane } = Tabs;

const Menu = () => {
  return (
    <Row>
      <Col xs={24} xl={4}></Col>
      <Col xs={24} xl={16}>
        <Tabs size="large" defaultActiveKey="1" centered>
          <TabPane
            tab={
              <span>
                <FaUserFriends />
                Employes
              </span>
            }
            key="1"
          >
            <UserTable />
          </TabPane>
          <TabPane
            tab={
              <span>
                <HiUserAdd />
                Add Employee
              </span>
            }
            key="2"
          >
            <AddEmployee />
          </TabPane>
          <TabPane
            tab={
              <span>
                <GrUserSettings />
                Account
              </span>
            }
            key="3"
          >
            <Account />
          </TabPane>
        </Tabs>
      </Col>
      <Col xs={24} xl={4}></Col>
    </Row>
  );
};

export default Menu;
