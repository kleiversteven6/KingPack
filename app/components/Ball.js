/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import * as THREE from 'three';
const files = require.context('../../public/assets/numbers/', true);

const scene = [];
const camera = [];
const renderer = [];
const esfera = [];

class Ball extends Component {
  constructor(props) {
    super(props);
    this.num = props.num;
    this.animate = this.animate.bind(this);
  }

  init() {
    // creating scene
    scene[this.num] = new THREE.Scene();
    scene[this.num].background = new THREE.Color('#FFFFFF');
    // add camera

    camera[this.num] = new THREE.PerspectiveCamera(75, 190 / 100);
    renderer[this.num] = new THREE.WebGLRenderer();
    document.body.appendChild(renderer[this.num].domElement);

    // add geometry
    const texture = new THREE.TextureLoader().load(files(`./${this.num}.png`));

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 1);

    const geometry = new THREE.SphereGeometry(6, 32, 16);
    const material = new THREE.MeshBasicMaterial({
      color: '#9DD1FF',
      map: texture,
      overdraw: 0.8,
    });
    esfera[this.num] = new THREE.Mesh(geometry, material);

    scene[this.num].add(esfera[this.num]);

    camera[this.num].position.z = 12;

    return renderer[this.num].domElement;
  }

  // animation
  animate() {
    requestAnimationFrame(this.animate);

    esfera[this.num].rotation.y += 0.01;

    renderer[this.num].render(scene[this.num], camera[this.num]);
  }

  componentDidMount() {
    document.getElementById(`Render-${this.num}`).appendChild(this.init());
    this.animate();
  }

  render() {
    return <div id={`Render-${this.num}`} />;
  }
}

export default Ball;
