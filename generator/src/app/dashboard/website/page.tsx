import React from 'react';
import * as Components from "./component";

type Props = {}

function page({}: Props) {
  return (
    <div className="flex flex-col gap-2">
        <Components.CreateOne />
        <Components.ListWebsite />
    </div>
  )
}

export default page