import React from "react";
import CollectionsItem from "./item";

export default function Collections() {
  return (
    <>
      <div className="section section--catalog" style={{marginTop: 100}}>
        <div className="container">
          <div className="row">
            <CollectionsItem title='nugo' img='https://s4.ezgif.com/tmp/ezgif-4-b34b4d8ed8.webp' alt='nugo'/>
            <CollectionsItem title='nugo' img='https://s4.ezgif.com/tmp/ezgif-4-b34b4d8ed8.webp' alt='nugo'/>
            <CollectionsItem title='nugo' img='https://s4.ezgif.com/tmp/ezgif-4-b34b4d8ed8.webp' alt='nugo'/>
            <CollectionsItem title='nugo' img='https://s4.ezgif.com/tmp/ezgif-4-b34b4d8ed8.webp' alt='nugo'/>
            <CollectionsItem title='nugo' img='https://s4.ezgif.com/tmp/ezgif-4-b34b4d8ed8.webp' alt='nugo'/>
            <CollectionsItem title='nugo' img='https://s4.ezgif.com/tmp/ezgif-4-b34b4d8ed8.webp' alt='nugo'/>
            <CollectionsItem title='nugo' img='https://s4.ezgif.com/tmp/ezgif-4-b34b4d8ed8.webp' alt='nugo'/>
          </div>
        </div>
      </div>
    </>
  );
}
