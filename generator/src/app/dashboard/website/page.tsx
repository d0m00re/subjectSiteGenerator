import React from 'react';
import * as Components from "./component";

function page() {
  return (
    <main className="">
        <Components.ModalCreateWebsite />
        <Components.ListWebsite />
    </main>
  )
}

export default page