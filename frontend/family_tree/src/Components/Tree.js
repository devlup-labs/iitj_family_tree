import * as d3 from 'd3';
import React, { useEffect, useLayoutEffect, useState } from "react";
import {CHILDREN_QUERY, PATH_QUERY, NODE_DETAILS_QUERY} from "../Queries.js";
import {client} from "../index.js";

function D3Tree(props){
  var data = props.TreeData;
  var stratify = d3.stratify().id(d=>d.rollNo).parentId(d=>d.parentId) ;
  var root = stratify(data);

  async function FetchPath(rollNo) {
    const response = await client.query({
      query: PATH_QUERY,
      variables: {
        rollNo,
      },
    })
    return response.data.studentPath;
  }

  async function FetchChildren(parentId) {
    const response = await client.query({
      query: CHILDREN_QUERY,
      variables: {
        parentId,
      },
    })
    return response.data.children;
  }

  async function FetchNodeDetails(rollNo) {
    const response = await client.query({
        query: NODE_DETAILS_QUERY,
        variables: {
          rollNo,
        },
      })
      return response.data.studentNode;
  }

  // useEffect(()=>{
  //   FetchPath(props.clickedNode).then((value)=> {
  //     for(var i=value.length-1; i>=0; i--){
  //       if(value[i].rollNo!==props.clickedNode){
  //         FetchChildren(value[i].rollNo).then((value1)=>{
  //           for(var i=0; i<value1.length; i++){
  //             const hasValue = data.some((temp=> temp.rollNo===value1[i].rollNo));
  //             if(!hasValue){
  //               data = data.concat(value1);
  //               console.log(data);
  //               break;
  //             }
  //           }
  //         });
  //       }
  //     }
  //     root = stratify(data);
  //     update(root);
  //   }) 
  // },[props.clickedNode,data])

  useLayoutEffect(() =>{
    var width = window.innerWidth;
    var height = window.innerHeight;

    var svg = d3.select("#tree")
                    .append("svg").attr("width", width).attr("height", height)
                    .call(d3.zoom().on("zoom", function (event) {
                      svg.attr("transform", event.transform)
                    }))
                    .append("g")
                    .attr("transform", "translate(" + width/2 + "," + height/3 + ")");

    var treemap = d3.tree().size([height,width]).nodeSize([120, 40]);

    var i = 0;
    var duration = 750;

    root.x0 = height / 2;
    root.y0 = 0;

    if(root.children){
      root.children.forEach(collapse);
    }

    function collapse(d) {
      if(d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }
    update(root);

    function update(source){
      var treeData = treemap(root);
      var nodes = treeData.descendants(),
          links = treeData.descendants().slice(1);

      nodes.forEach(function(d){ 
        d.y = d.depth * 180 ;
      });

      var node = svg.selectAll('g.node')
          .data(nodes, function(d) {return d.id || (d.id = ++i); });

      var display = false;

      var nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr("transform", function(d) {
            return "translate(" + source.x0  + "," + source.y0 + ")";
        })
        .on('click', click)
        .on("mousedown", function(d,node) {
          if(d.button==0){
            updateChildren(d,node)
          }
          // var g = d3.select(this); 
          // if(g.property("childNodes").length<3) {
          //   g.append('circle')
          //   .attr('class', 'button')
          //   .attr('fill', 'gray')
          //   .attr('r', 10)
          //   .attr("cx", -10)
          //   .attr("cy", -14);
          //   g.select('.button')
          //   .append('animate')
          //   .classed('animate', true)
          //   .attr('attributeName', 'r')
          //   .attr('values', '0;10')
          //   .attr('begin', 'indefinite')
          //   .attr('dur', '0.2s')
          //   .attr('repeatCount', 1);
          // g.append('text')
          //   .classed('button', true)
          //   .attr('x', -16)
          //   .attr('y', -10)
          //   .text("FB")
          //   .style("border", "solid")
          //   .style("stroke", "white")
          //   .style("cursor", "pointer")
          //   .on('click', test);
          //   g._groups[0][0].getElementsByTagName("animate")[0].beginElement();
          // }else{
          //   g.selectAll('.button').style("visibility", "visible");
          // }
        })
        .on("mouseout", function() {
          d3.select(this).selectAll('.button').style("visibility", "hidden");
        })
        .on('contextmenu', function(node,d){
          node.preventDefault();
          display = !display;
          FetchNodeDetails(d.data.rollNo).then((value)=>{
            props.setDetails({name: d.data.name, 
            branch: value.branch, 
            year: value.year,
            email: value.email,
            picture: value.picture,
            linkedIn: value.linkedIn,
            hometown: value.homeTown,
            coCurriculars: value.extraCurriculars,
            // socialMedia: value.socialMedia,
            display: display,
            });
          })
          
        });

      nodeEnter.append('circle')
          .attr('class', 'node')
          .attr('r', 1e-6)
          .style("fill", function(d) {
              return d._children ? "lightsteelblue" : "#fff";
          })
          .on('mouseover',(d)=>{
            var g=d.target.parentNode
            if(g.childNodes.length>3){
            g.getElementsByTagName("animate")[0].beginElement();
            }
          });

      nodeEnter.append('text')
          .attr("dy", ".35em")
          .attr("x", 13)
          .text(function(d) { 
              return d.id; 
            });

      var nodeUpdate = nodeEnter.merge(node)
      .attr("fill", "#fff")
      .attr("stroke", "steelblue")
      .attr("stroke-width", "3px;")
      .style('font', '12px sans-serif')

      nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function(d) { 
            return "translate(" + d.x + "," + d.y + ")";
        });

      nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff";
        })
        .attr('cursor', 'pointer');

      var nodeExit = node.exit().transition()
          .duration(duration)
          .attr("transform", function(d) {
              return "translate(" + source.x + "," + source.y + ")";
          })
          .remove();

      nodeExit.select('circle')
        .attr('r', 1e-6);

      nodeExit.select('text')
        .style('fill-opacity', 1e-6);

      var link = svg.selectAll('path.link')
          .data(links, function(d) { return d.id; });

      var linkEnter = link.enter().insert('path', "g")
          .attr("class", "link")
          .attr('d', function(d){
            var o = {x: source.x0, y: source.y0}
            return diagonal(o, o)
          });

      var linkUpdate = linkEnter.merge(link)
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-width", "2px")

      linkUpdate.transition()
          .duration(duration)
          .attr('d', function(d){ return diagonal(d, d.parent) });

      var linkExit = link.exit().transition()
          .duration(duration)
          .attr('d', function(d) {
            var o = {x: source.x, y: source.y}
            return diagonal(o, o)
          })
          .remove();

      nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
      });

      function diagonal(s, d) {
        const path = `M ${s.x} ${s.y}
                  C ${(s.x + d.x) / 2} ${s.y},
                    ${(s.x + d.x) / 2} ${d.y},
                    ${d.x} ${d.y}`
        return path;
      }
    }

    function test(){
      console.log("clicked");
    }

    function click(d,node) {
      setTimeout(()=> {
        if (node.children) {
            node._children = node.children;
            node.children = null;
          } else {
            node.children = node._children;
            node._children = null;
          }
        update(node);
        },100)
    }

    function updateChildren(d,node){
      if(!node.children && !node._children){
        FetchChildren(node.data.rollNo)
        .then(value=> {
            if(value.length!==0){
              for(var i=0; i<value.length; i++){
                const hasValue = data.some((temp=> temp.rollNo===value[i].rollNo));
                if(!hasValue){
                  data = data.concat(value);
                  break;
                }
              } 
            root = stratify(data);
          }
        })
      }
    }
  },[])

  return(
    <div id="tree"></div>
  )
}
export default D3Tree;