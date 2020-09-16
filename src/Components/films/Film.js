import React from "react";
import {Button, List, Panel, Row} from "rsuite";
import Col from "rsuite/lib/Carousel";

const Film = (props) => {
  return (
    <Panel bordered header={props.data.title}>
      <List size="sm">
        <List.Item>
          <strong>Descripcion: </strong> <span>{props.data.description}</span>
        </List.Item>
        <List.Item>
          <strong>Reparto: </strong>{" "}
          <span>{String(props.data.actors).toLocaleLowerCase()}</span>
        </List.Item>
        <List.Item>
          <strong>Categoria: </strong> <span>{props.data.category}</span>
        </List.Item>
        <List.Item>
          <strong>Precio: </strong> <span>$ {props.data.price} </span>
        </List.Item>
        <List.Item>
          <strong>Costo de Reemplazo: </strong>{" "}
          <span>{props.data.rental_duration}</span>
        </List.Item>
      </List>
    </Panel>
  );
};

export default Film;
