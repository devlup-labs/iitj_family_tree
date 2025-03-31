import React, { useState, useRef, useEffect } from "react";
import Tree from "react-d3-tree";
import "../assets/Style/home.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import Profile from "./Profile";
import { useData } from "../context/DataContext"; 
import { useNavigate } from "react-router-dom";

const TwoDTree = ({ data }) => {
  // const [roll, setroll] = useState();
  // const [showModal, setShowModal] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const treeContainerRef = useRef(null);
  const value = 0.5;
  const { search } = useData();
  const searchNode = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const setInitialDimensions = () => {
      if (treeContainerRef.current) {
        const { width, height } =
          treeContainerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    setInitialDimensions();
    window.addEventListener("resize", setInitialDimensions);
    return () => window.removeEventListener("resize", setInitialDimensions);
  }, []);

  useEffect(() => {
    searchNode.current = document.getElementById(search);
    // console.log(searchNode);
    if (searchNode.current) {
      // Trigger programmatic click
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      searchNode.current.dispatchEvent(clickEvent);
    }
  },[search])

  if (!data)
    return (
      <div className="loading_conatiner">
        <CircularProgressbar
          className="loading"
          value={value}
          maxValue={1}
          text={`${value * 100}%`}
        />
      </div>
    );

  const new_data = [];
  const all_parent = {
    name: "All",
    children: [],
  };
  data.forEach((item) => {
    all_parent.children.push(item);
  });
  new_data.push(all_parent);

  // const handleNodeMouseOver = (nodeDatum) => {
  //   // console.log(search);
  //   if (nodeDatum.name !== "All") {
  //     setroll(nodeDatum);
  //     setShowModal(true);
  //   }
  // };

  // const handleNodeMouseOut = (nodeData) => {
  //   if (nodeData.name !== "All") {
  //     setShowModal(false);
  //   }
  // };

  const renderCustom = ({ nodeDatum, toggleNode }) => {
    const str = nodeDatum.name;
    const name = str.slice(0, 19) + "";

    return (
      <g
        onClick={toggleNode}
        // onMouseOut={() => handleNodeMouseOut(nodeDatum)}
        // onMouseOver={() => handleNodeMouseOver(nodeDatum)}
        id={nodeDatum.rollNo}
      >
        <circle r={7} className="circlecolor" onClick={
          () => {
            console.log(nodeDatum.rollNo);
            navigate(`/search?q=${window.btoa(nodeDatum.rollNo)}`);
          }
        }/>
        <text textAnchor="middle" dy="24" dx="0" className="text_">
          {name}
        </text>
      </g>
    );
  };

  const getLinkColor = (link) => {
    if (link.source.name.includes("root")) {
      return "white";
    }
    return "white";
  };

  const getLinkProps = (link) => ({
    stroke: getLinkColor(link),
    strokeWidth: 10,
  });

  const handleNodeMouseOver = (nodeDatum, event) => {
    if (nodeDatum.name !== 'All') {
      setroll(nodeDatum)
      setShowModal(true)

    }
  };
  const handleNodeMouseOut = (nodeData, event) => {
    if (nodeData.name !== 'All') {
      setShowModal(false)
    }
  };
  // const dimensions = {
  //   width: 800,
  //   height: 600
  // };
  
  const dimensions = {
    width: window.innerWidth,  // Full screen width
    height: window.innerHeight // Full screen height
  };
  
  <Tree 
    data={new_data}
    translate={{ x: dimensions.width / 2, y: dimensions.height / 2 }} // Center both horizontally & vertically
    dimensions={dimensions}
  />
  
  return (
    <>
      {/* {showModal && <Profile rollNo={roll.rollNo} />} */}
      <div ref={treeContainerRef} style={{ width: "100%", height: "100vh" }}>
        <Tree
          data={new_data}
          scaleExtent={{ min: 0.25, max: 2 }}
          zoom={1.5}
          zoomable={true}
          linkClassName="custom-link"
          depthFactor={500}
          linkProps={getLinkProps}
          nodeSize={{ x: 100, y: 20 }}
          translate={{ x: 200, y: 530 }}
          dimensions={dimensions}
          renderCustomNodeElement={(rd3tProps) =>
            renderCustom({
              ...rd3tProps,
              toggleNode: () => {
                rd3tProps.toggleNode();
              },
            })
          }
          transitionDuration={500}
          shouldCollapseNeighborNodes={true}
          separation={{ siblings: 2, nonSiblings: 2 }}
        />
      </div>
    </>
  );
};

export default TwoDTree;
