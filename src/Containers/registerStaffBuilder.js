import React, {useEffect, useState} from "react";
import {Table} from "rsuite";
import {Paxios} from "config/axios.config";
const {Column, HeaderCell, Cell, Pagination} = Table;

const RegisterStaffBuider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchRequest = async () => {
    const res = await Paxios.get("/customer/list")
      .then((res) => res)
      .catch((err) => err.response);
    if (res.status == 200) {
      const {data} = res;
      setData(data.data);
      setLoading(false);
      console.log(data);
      /*   let newData = data.map(() => {
        el.active = el.active ? "Si" : "no";
      }); */
      console.log();
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div>
      <Table loading={loading} height={420} data={data}>
        <Column width={50} align="center" resizable>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="ID" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Nombre</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Direccion</HeaderCell>
          <Cell dataKey="addres" />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Telefono</HeaderCell>
          <Cell dataKey="phone" />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Ciudad</HeaderCell>
          <Cell dataKey="city" />
        </Column>
        <Column width={200} resizable>
          <HeaderCell>Pais</HeaderCell>
          <Cell dataKey="country" />
        </Column>
        <Column width={200} resizable>
          <HeaderCell>Estado</HeaderCell>
          <Cell dataKey="notes" />
        </Column>
      </Table>
    </div>
  );
};

export default RegisterStaffBuider;
