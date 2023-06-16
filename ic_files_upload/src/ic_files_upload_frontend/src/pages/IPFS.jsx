import React from 'react'
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";

const IPFS = () => {
  // const [images, setImages] = React.useState<{ cid: CID; path: string }[]>([]);
  const [images, setImages] = React.useState([]);

  // let ipfs: IPFSHTTPClient || undefined;
  let ipfs;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",

    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const files = form[0].files;
  
    if (!files || files.length === 0) {
      return alert("No files selected");
    }
  
    const file = files[0];
    // upload files
    const result = await ipfs.add(file);
  
    setImages([
      ...images,
      {
        cid: result.cid,
        path: result.path,
      },
    ]);
  
    form.reset();
  };
  

  return (
    <div className="App">
      <header className="App-header">
        {!ipfs && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}
      </header>
      {ipfs && (
          <>
            <p>Upload File using IPFS</p>

            <form onSubmit={onSubmitHandler}>
              <input name="file" type="file" />

              <button type="submit">Upload File</button>
            </form>
          </>
        )}
    </div>
  )
}

export default IPFS