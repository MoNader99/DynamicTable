import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Home = ({ setRowNo ,setDepName, setMonthName ,setYearName,setColNo}) => {
  const [Rows, setRows] = useState(0);
  const [dep, setDep] = useState("")
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(2023)
  const history = useHistory();

  const daysInMonth = (iMonth, iYear) =>
  {
    return new Date(iYear, iMonth, 0).getDate();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Rows<=0) {
      return toast.dark("بالرجاء ادخال عدد الافراد في الروستر بشكل صحيح");
    }
    else if(dep===""){
      return toast.dark("بالرجاء القسم بشكل صحيح");
    }
    else if(month===0){
      return toast.dark("بالرجاء ادخال الشهر بشكل صحيح");
    }
    else if(year===0){
      return toast.dark("بالرجاء ادخال السنة بشكل صحيح");
    }
    const columns = daysInMonth(month,year)
    setRowNo(Rows);
    setDepName(dep);
    setMonthName(month);
    setYearName(year);
    setColNo(columns);
    history.push("/createTable");
  };
  return (
    <Container style={{marginTop:"100px"}}>
      <Row>
        <h1 className="text-center my-5">
          منظومة <span className="text-primary">الروسترات</span>
        </h1>
        <Col md={8} className="mx-auto mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicNumber">
              <Row>
                  <Col md={4} className="mx-auto mt-5">
                    <h5  style={{textAlign:"right"}} className="mb-3 text-right">عدد الأفراد</h5>
                    <Form.Control
                      style={{textAlign:"right"}}
                      value={Rows}
                      onChange={(e) => setRows(e.target.value)}
                      type="number"
                      name="RowsNo"
                      min = "0"
                    />
                  </Col>
                  <Col md={4} className="mx-auto mt-5">
                    <h5 style={{textAlign:"right"}} className="mb-3">القسم</h5>
                    <Form.Control
                      style={{textAlign:"right"}}
                      value={dep}
                      onChange={(e) => setDep(e.target.value)}
                      type="text"
                      name="Department"
                    />
                  </Col>
                  <Col md={4} className="mx-auto mt-5">
                  <h5 style={{textAlign:"right"}} className="mb-3">الشهر</h5>
                  <select
                    style={{
                      width: "100%",
                      minHeight: "35px",
                      fontSize: "15px",
                    }}
                    className="custom-select"
                    value={month}
                    onChange={(e) => {
                      const SelectedOption = e.target.value;
                      setMonth(SelectedOption);
                    }}
                  >
                    <option value="0">الشهر</option>
                    <option value="1"> (1) يناير</option>
                    <option value="2"> (2) فبراير</option>
                    <option value="3"> (3) مارس</option>
                    <option value="4"> (4) ابريل</option>
                    <option value="5"> (5) مايو</option>
                    <option value="6"> (6) يونيو</option>
                    <option value="7"> (7) يوليو </option>
                    <option value="8"> (8) اغسطس</option>
                    <option value="9"> (9) سبتمبر</option>
                    <option value="10">(10) اكتوبر</option>
                    <option value="11">(11) نوفمبر</option>
                    <option value="12">(12) ديسمبر</option>
                  </select>
                  </Col>
              </Row>
            </Form.Group>
            <Container style={{padding: "40px 350px"}}>
            <Form.Group controlId="formBasicBtn" className="my-5">
              <Button
                type="submit"
                variant="dark"
                bg="dark"
                className="form-control"
              >
                التالي
              </Button>
            </Form.Group>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
