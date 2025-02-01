import { ForceGraph3D } from 'react-force-graph';
import React from 'react';
import * as THREE from 'three';
import defaultimage from '../assets/image/download.jpeg'
import logo from '../assets/image/logo.png'
import background from '../assets/image/b1.jpg'

const ImageTree = ({ data }) => {
  const nodes = [{
    id: 'All',
    user: 'IITJ',
    description: 'IITJ',
    img: logo
  }];
  const links = [];
  // var image;
  if (data[0]) {

    // image = data[0].picture.replace('open', 'thumbnail')
  }

  const processNode = (node, parentId) => {
    const nodeData = {
      id: node.rollNo,
      user: node.name,
      description: node.rollNo,
      img: node.picture ? node.picture : defaultimage
    };
    nodes.push(nodeData);
    if (node.parentId) {
      links.push({ source: node.parentId, target: node.rollNo });
    }
    else {
      links.push({ source: 'All', target: node.rollNo });

    }
    node.children.forEach(child => {
      processNode(child);
    });
  }
  data.forEach(element => {
    if (element.parentId) {
      const nodeData = {
        id: element.rollNo,
        user: element.name,
        description: element.rollNo,
        img: element.picture ? element.picture : defaultimage
      };
      nodes.push(nodeData);
      links.push({ source: 'All', target: element.rollNo });
    }
    else {

      processNode(element)
    }
  });
  const graphdata =
  {
    nodes: nodes,
    links: links
  }
   const linkMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff, // Red color
      opacity: 0.4,
      transparent: false,
    });
     const getNodeColor = node => {
    switch (node.group) {
      case 1: return 'rgba(255,0,0,1)';  // Red for group 1
      case 2: return 'rgba(0,255,0,1)';  // Green for group 2
      default: return 'rgba(0,0,255,1)'; // Blue for others
    }
  };
    const getNodeLabel = node => `${node.user}: ${node.description}`;
    const mystyle={
      backgroundImage: `url(${background})`,
      backdropFilter: "blur(6px)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      opacity: '0.8',
     };
//  if any quries regrading 3D Graph read this repo 
// https://github.com/vasturiano/react-force-graph?tab=readme-ov-file
  return (
    <div className='imagetree' style={mystyle}>
      <ForceGraph3D
        backgroundColor={'rgba(137, 173, 218, 0.951)'}
        linkColor={'red'}
        linkMaterial={linkMaterial}
        linkOpacity={1}
        nodeRelSize={0}
        nodeColor={getNodeColor }
        width={window.innerWidth}
        height={window.innerHeight}
        linkCurvature={0.5}
        linkCurveRotation={1}
        linkWidth={0.5}
        // minZoom={2}
        // maxZoom={5}
        graphData={graphdata}
        nodeLabel={getNodeLabel}
        nodeAutoColorBy="user"
        linkDirectionalParticles={1}
        // linkThreeObjectExtend={true}
        nodeThreeObject={({ img }) => {
          const imgTexture = new THREE.TextureLoader().load(img);
          imgTexture.colorSpace = THREE.SRGBColorSpace;
          const material = new THREE.SpriteMaterial({
            map: imgTexture,
            color: 0xffffff,
          });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(12, 12);
          return sprite;
        }}
      />

    </div>
    

  );
};

export default ImageTree;
