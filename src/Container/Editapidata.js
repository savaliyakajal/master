import React, { useState, useEffect } from "react";
import { Col, Row, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
const Api = "https://dummyapi.io/data/v1/user?page=1&limit=50";
function Editapidata() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [Editdata, setEditdata] = useState();
  console.log(Editdata);
  const [userdata, setUserdata] = useState([]);
  console.log(userdata);
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    setValue("firstName", Editdata?.firstName);
    // setValue("picture", Editdata?.picture);
    setValue("title", Editdata?.title);
    setValue("lastName", Editdata?.lastName);
  }, [Editdata?.firstName, Editdata?.title, Editdata?.lastName]);
  useEffect(() => {
    fetch(Api, {
      method: "get",
      headers: { "app-id": "639172c734f59a65dd76d340" },
    })
      .then((response) => response.json())
      .then((data) => setUserdata(data.data));
  }, []);

  useEffect(() => {
    userdata?.map((v) => {
      // console.log(v.id==id)
      if (v.id == id) {
        setEditdata({
          id: v.id,
          firstName: v.firstName,
          lastName: v.lastName,
          //   picture:v.picture,
          title: v.title,
        });
      }
    });
  }, [id, userdata]);

  const onSubmit = (data) => {
    console.log(data);
    fetch(`https://dummyapi.io/data/v1/user/${id}`, {
      method: "PUT",
      headers: {
        "app-id": "639172c734f59a65dd76d340",
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    navigate("/Apidata");
  };
  return (
    <div>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="px-4">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-center text-uppercase ">
                  Registration
                </h2>
                <div className="mb-3">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label className="text-center" htmlFor="firstName">
                        {" "}
                        firstName
                      </label>
                      <input
                        {...register("firstName", {})}
                        placeholder="firstName"
                        type="Text"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="text-center" htmlFor="lastName">
                        {" "}
                        lastName
                      </label>
                      <input
                        {...register("lastName", {})}
                        placeholder="lastName"
                        type="Text"
                      />
                    </div>
                    {errors.name && (
                      <p className="error">
                        {"lastName  mats be  required minimum  2 characters"}
                      </p>
                    )}
                    <div className="mb-3">
                      <label className="text-center" htmlFor="title">
                        {" "}
                        title
                      </label>

                      <select {...register("title")}>
                        <option value="ms">ms</option>
                        <option value="miss">miss</option>
                        <option value="mrs">mrs</option>
                        <option value="dr">dr</option>
                        <option value="mr">mr</option>
                      </select>
                    </div>
                    {errors.title && (
                      <p className="error">{"title    must be required"}</p>
                    )}

                    {/* <div className="mb-3">
                    <label className="text-center" htmlFor="picture">
                      {" "}
                      picture
                    </label>
                    <input
                      {...register("picture", {
                        // required: true,
                      })}
                      placeholder="picture"
                      type="file"
                    />
                  </div> */}

                    <div>
                      {" "}
                      <label className="text-center" htmlFor="Gender">
                        {" "}
                        Gender
                      </label>
                      <select>
                        <option selected value="1">
                          male
                        </option>
                        <option value="2">Female</option>
                        <option value="3">other</option>
                      </select>
                    </div>
                    <button type="submit" variant="secondary">
                      submit
                    </button>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Editapidata;
