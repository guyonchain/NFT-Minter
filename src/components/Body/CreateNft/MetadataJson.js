import React, { useContext, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { uploadedNFTImageURIData } from "./CreateNft";
import { pubAddressData } from "../../AppLayout";

const Metadata = () => {
  const { uploadedNFTImageURI } = useContext(uploadedNFTImageURIData);
  const { pubAddress } = useContext(pubAddressData);
  console.log(uploadedNFTImageURI);

  const [nftData, setNftData] = useState({
    name: "",
    description: "",
    image: { uploadedNFTImageURI },
    attributes: [
      { trait_type: "Creator's Name", value: "" },
      { trait_type: "Creator's GitHub ID", value: "" },
      { trait_type: "Creator's Wallet Address", value: pubAddress },
    ],
  });

  const [copyMessage, setCopyMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNftData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setNftData((prevData) => ({
      ...prevData,
      image: uploadedNFTImageURI,
    }));
  }, [uploadedNFTImageURI]);

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...nftData.attributes];
    updatedAttributes[index][field] = value;
    setNftData((prevData) => ({
      ...prevData,
      attributes: updatedAttributes,
    }));
  };

  const handleAddAttribute = () => {
    setNftData((prevData) => ({
      ...prevData,
      attributes: [...prevData.attributes, { trait_type: "", value: "" }],
    }));
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(JSON.stringify(nftData, null, 2))
      .then(() => {
        setCopyMessage("Copied to clipboard!");
        setTimeout(() => {
          setCopyMessage("");
        }, 2000); // Clear message after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="flex sm:flex-row flex-col gap-5 justify-center">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold w-fit p-1 border-b-4 border-gray-600 rounded-lg">
          NFT Manager
        </h2>
        <div className="flex flex-col gap-2 ">
          <label className="flex gap-5 border-4 p-2 rounded-lg">
            Name* :
            <input
              type="text"
              name="name"
              value={nftData.name}
              onChange={handleInputChange}
              placeholder="ex. Cool Monkey"
              required
            />
          </label>
          <label className="flex gap-5 border-4 p-2 rounded-lg">
            Description* :
            <input
              type="text"
              name="description"
              value={nftData.description}
              onChange={handleInputChange}
              placeholder="ex. This is the Cool-Monkey NFT"
              required
            />
          </label>
          <label className="flex gap-5 border-4 p-2 rounded-lg">
            Image:
            <input
              type="text"
              name="image"
              value={uploadedNFTImageURI}
              disabled
              required
            />
          </label>
          <p className="text-xl font-bold w-fit p-1 border-b-4 border-gray-600 rounded-lg">
            Attributes
          </p>
          {nftData.attributes.map((attr, index) => (
            <div className="flex gap-3" key={index}>
              <label className="flex flex-1 gap-5 border-4 p-2 rounded-lg">
                Trait Type* : {attr.trait_type}
              </label>
              <label className="flex gap-5 border-4 p-2 rounded-lg">
                Value* :
                <input
                  type="text"
                  value={attr.value}
                  required
                  onChange={(e) =>
                    handleAttributeChange(index, "value", e.target.value)
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex justify-center gap-2">
          <h2 className="text-2xl font-bold w-fit p-1 border-b-4 border-gray-600 rounded-lg">
            Updated NFT JSON Metadata
          </h2>
          <button
            className="border content- rounded-lg bg-cyan-200 p-2 hover:bg-cyan-300"
            onClick={handleCopy}
          >
            Copy to Clipboard
          </button>
        </div>
        <div>
          {copyMessage && <p style={{ color: "green" }}>{copyMessage}</p>}
        </div>
        <div className="w-[100%]">
          <SyntaxHighlighter language="json" style={solarizedlight}>
            {JSON.stringify(nftData, null, 2)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default Metadata;
