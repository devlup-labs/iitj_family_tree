import * as d3 from 'd3';
import StudentData from "../Data1.json";
import React, { useLayoutEffect } from "react";

function D3Tree(props){
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
    var data = StudentData;    

    var treemap = d3.tree().size([height,width]).nodeSize([120, 40]);

    var stratify = d3.stratify().id(d=>d.student.name).parentId(d=>d.parent) ;
    var root = stratify(data);

    var i = 0;
    var duration = 750;

    root.x0 = height / 2;
    root.y0 = 0;

    root.children.forEach(collapse);
    function collapse(d) {
      if(d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }
    update(root);

    function update(source) {
      var treeData = treemap(root);

      var nodes = treeData.descendants(),
          links = treeData.descendants().slice(1);

      nodes.forEach(function(d){ 
        d.y = d.depth * 180 ;
      });


      var node = svg.selectAll('g.node')
          .data(nodes, function(d) {return d.id || (d.id = ++i); });

      var nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr("transform", function(d) {
            return "translate(" + source.x0  + "," + source.y0 + ")";
        })
        .on('click', click)
        .on('contextmenu', function(node,d){
          props.setCardName(d.id);
          props.setCardBranch(d.data.student.branch);
          props.setCardYear(d.data.student.year);
          props.setCardEmail(d.data.student.email);
          props.setCardPicture(d.data.student.picture);
          props.setCardLinkedIn(d.data.student.linkedIn);
          props.setCardHometown(d.data.student.hometown);
          props.setCardCoCurriculars(d.data.student.coCurriculars);
          props.setCardSocialMedia(d.data.student.socialMedia);
          props.setCardDisplay(true);
        });

      nodeEnter.append('circle')
          .attr('class', 'node')
          .attr('r', 1e-6)
          .style("fill", function(d) {
              return d._children ? "lightsteelblue" : "#fff";
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

      function click(d,node) {
        if (node.children) {
            node._children = node.children;
            node.children = null;
          } else {
            node.children = node._children;
            node._children = null;
          }
        update(node);
      }
    }
  })

  return(
    <div id="tree"></div>
  )
}
export default D3Tree;