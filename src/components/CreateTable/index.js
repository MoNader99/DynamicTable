import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import ExportToExcel from "../ExportToExcel";
import Select_com from "../Select_com";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from 'react-bootstrap/Form';

const CreateTable = ({ RowNo, dep, month , year, ColNo}) => {
  const [radioValue, setRadioValue] = useState("X");

  const [depN, setDep] = useState(dep)
  const [monthN, setMonth] = useState(month)
  var months = [
    "يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو",
    "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"
  ];

  const [CustomValue, setCustomValue] = useState(" ")
  const radios = [
    { name: " X ", value: "X" },
    { name: " P ", value: "P" },
    { name: " SN ", value: "SN" },
    { name: " - ", value: "-" },
    { name: "أخرى", value: CustomValue },
    { name: " مسح ", value: "" },
  ];

  

  const [ChangeTitle, setChangeTitle] = useState(false);

  const [UserChoice, setChoice] = useState("X");
  const [columns, setColumns] = useState(["الرتبة", "الإسم"]);
  const [generating, setGenerating] = useState(true);
  const [readOnly, setReadOnly] = useState(true);
  const [rows, setRows] = useState(RowNo);
  const [rowsData, setRowsData] = useState([]);
  const [modified, setModified] = useState(false);

  const handleChange = (e, index, index2) => {
    const fields = rowsData[index].map((r, j) => (j === index2 ? e : r));
    setRowsData(rowsData.map((rw, i) => (i === index ? fields : rw)));
  };

  const addRow = () => {
    setModified(true);
    setRows((prevRows) => prevRows + 1);
    let array = [""];
    for (let i = 1; i < columns.length; i++) {
      array.push("");
    }
    setRowsData((prevRowsData) => [...prevRowsData, array]);
  };

  const deleteRow = (index) => {
    setModified(true);
    setRows((prevRows) => prevRows - 1);
    setRowsData((prevRowsData) => prevRowsData.filter((row, i) => i !== index));
  };

  const exportToJson = () => {
    const data = [];

    rowsData.map((row, index) => {
      const obj = { sno: index + 1 };
      columns.map((col, i) => {
        obj[col] = row[i];
      });
      data.push(obj);
    });

    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `data.json`;
    link.href = url;
    link.click();
  };

  useEffect(() => {
    if (columns.length < (ColNo+4) && !modified) {
      for (let i = 2; i < (ColNo+2); i++) {
        setColumns((prevColumns) => [...prevColumns, (i - 1).toString()]);
        setRowsData((prevRowsData) =>
          prevRowsData.map((row) => row.push("") && row)
        );
      }
    }

    if (rows.length < rows && !modified) {
      for (let i = 0; i < rows; i++) {
        setRows((prevRows) => prevRows + 1);
        let array = [""];
        for (let i = 1; i < (ColNo+2) ; i++) {
          array.push("");
        }
        setRowsData((prevRowsData) => [...prevRowsData, array]);
      }
    }
    setGenerating(false);
  }, []);

  return (
    <div>
      {
        ChangeTitle === true ? 
        <Container>
          <Col md={2} className="mx-auto mt-5">
            <h5 style={{textAlign:"right"}} className="mb-3">القسم</h5>
            <Form.Control
              style={{textAlign:"right"}}
              value={depN}
              onChange={(e) => setDep(e.target.value)}
              type="text"
              name="Department"
            />
          </Col>
          <Col md={2} className="mx-auto mt-1">
          <h5 style={{textAlign:"right"}} className="mb-3">الشهر</h5>
          <select
            style={{
              width: "100%",
              minHeight: "35px",
              fontSize: "15px",
            }}
            className="custom-select"
            value={monthN}
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
          <Container style={{padding: "40px 550px"}}>
            <Form.Group controlId="formBasicBtn" className="my-1">
              <Button
                variant="dark"
                bg="dark"
                className="form-control"
                onClick={(e)=>{
                  setChangeTitle(false)
                }}
              >
                حفظ
              </Button>
            </Form.Group>
            </Container>
        </Container>
        :
        <div>
           <h5
            onDoubleClick={(e)=>{
              setChangeTitle(true)
            }}
              style={{
                textAlign: "center",
                paddingTop: "50px",
                fontWeight: "900",
                fontSize: "35px",
              }}
            >
              روستر قسم {depN} لشهر {months[monthN-1]} {year}
            </h5>
        </div>
      }

      <div className="mt-2">
        <h6> اختر </h6>
        <ButtonGroup className="mb-2">
          {radios.map((radio, idx) => (
            radio.name === "أخرى" ? 
            <ToggleButton
              style={{
                marginRight: "20px",
                borderRadius: "20px",
                fontWeight: "600",
              }}
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="info"
              name="radio"
              value={CustomValue}
              checked={radioValue === CustomValue}
              onChange={(e) => {
                setRadioValue(e.currentTarget.value);
                setChoice(e.currentTarget.value);
              }}
            >
              <div style={{display:"inline-flex"}}>
                {radio.name}
                <Form.Control
                  style={{textAlign:"right",maxHeight: "25px",marginRight: "10px",maxWidth:"50px"}}
                  value={CustomValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  type="text"
                  name="customValue"
                />
              </div>
            </ToggleButton>
            : 
            <ToggleButton
              style={{
                marginRight: "20px",
                borderRadius: "20px",
                fontWeight: "600",
              }}
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={radio.value === "" ? "danger" : "warning"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => {
                setChoice(e.currentTarget.value);
                setRadioValue(e.currentTarget.value);
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <Row>
        <Col md={12} className="">
          {!generating ? (
            <div>
              <Table className="h-25">
                <thead>
                  <tr className="bg-dark text-white">
                    <th
                      scope="col"
                      className="d-flex align-items-center justify-content-center py-3 pb-2 border-0"
                    >
                      م
                    </th>
                    {columns.map((col, index) => (
                      <th key={index} scope="col">
                        <input
                          disabled="true"
                          type="text"
                          className="form-control border-0 text-center bg-dark text-white"
                          style={{ boxShadow: "none", padding: "0" }}
                          readOnly={readOnly}
                          onFocus={() => setReadOnly(false)}
                          onBlur={() => setReadOnly(true)}
                          value={columns[index]}
                          onChange={(e) =>
                            setColumns(
                              columns.map((coln, id) =>
                                id === index ? e.target.value : coln
                              )
                            )
                          }
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowsData.length > 0 ? (
                    <>
                      {rowsData.map((data, index) => (
                        <tr key={index + 5}>
                          <td className="text-center">{index + 1}</td>
                          {data.map((row, index2) => (
                            <td
                              style={{ padding: "10px 0px" }}
                              key={index2 + 988}
                            >
                              {index2 === 0 ? (
                                <div
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    padding: "0px 0px 0px 0px",
                                    width: "90px",
                                  }}
                                >
                                  <Select_com
                                    handleChange={handleChange}
                                    index={index}
                                    index2={index2}
                                  />
                                </div>
                              ) : index2 === 1 ? (
                                <input
                                  style={
                                    index2 === 0
                                      ? {
                                          padding: "0px 0px 0px 0px",
                                          width: "95px",
                                        }
                                      : index2 === 1
                                      ? {
                                          padding: "0px 0px 0px 0px",
                                          width: "170px",
                                          height: "35px",
                                          fontSize: "12px",
                                          fontWeight:"bold"
                                        }
                                      : {
                                          padding: "0px 0px 0px 0px",
                                          width: "70%",
                                        }
                                  }
                                  type="text"
                                  className="form-control text-center"
                                  placeholder={`الإسم`}
                                  value={rowsData[index][index2]}
                                  onChange={(e) => {
                                    handleChange(e.target.value, index, index2);
                                  }}
                                />
                              ) : (
                                <input
                                  style={
                                    index2 === 0
                                      ? {
                                          padding: "0px 0px 0px 0px",
                                          width: "95px",
                                        }
                                      : index2 === 1
                                      ? {
                                          padding: "0px 0px 0px 0px",
                                          width: "110px",
                                        }
                                      : {
                                          padding: "0px 0px 0px 0px",
                                          width: "100%",
                                          fontWeight: "700",
                                          height: "35px",
                                        }
                                  }
                                  type="text"
                                  className="form-control text-center"
                                  placeholder={``}
                                  value={rowsData[index][index2]}
                                  onClick={(e) => {
                                    handleChange(UserChoice, index, index2);
                                  }}
                                />
                              )}
                            </td>
                          ))}
                          <td className="text-center">
                            <Button
                              type="button"
                              onClick={() => deleteRow(index)}
                              variant={"outline-danger"}
                              size="sm"
                            >
                              مسح
                            </Button>
                          </td>
                        </tr>
                      ))}

                      <tr>
                        <th colSpan={columns.length + 2} className="pt-5">
                          <Button
                            style={{ maxWidth: "200px" }}
                            type="button"
                            onClick={addRow}
                            className="w-100"
                            variant="outline-dark"
                          >
                            إضافة اسم جديد
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            style={{ alignItems: "end" }}
                            type="button"
                            onClick={exportToJson}
                            variant="success"
                          >
                            تحميل بصيغة JSON
                          </Button>
                          &nbsp;&nbsp;
                          <ExportToExcel
                            columns={columns}
                            rowsData={rowsData}
                          />
                        </th>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <th
                          className="text-center py-3"
                          colSpan={columns.length + 2}
                        >
                          اضغط على اضافة اسم جديد واضف البيانات
                        </th>
                      </tr>
                      <tr>
                        <th colSpan={columns.length + 2}>
                          <Button
                            type="button"
                            onClick={addRow}
                            className="w-100"
                            variant="outline-dark"
                          >
                            اضافة اسم جديد
                          </Button>
                        </th>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            </div>
          ) : (
            <h1 className="text-center my-5">Generating...</h1>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CreateTable;
