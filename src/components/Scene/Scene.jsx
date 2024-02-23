import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  PresentationControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import gsap from "gsap";

export default function Scene() {
  const cloudGroup = useGLTF("./groupclouds.glb");
  const phoenix = useGLTF("./phoenix.glb");

  const controls = useRef();
  const phoenixAnimations = useAnimations(phoenix.animations, phoenix.scene);
  const cloudGroupAnimations = useAnimations(
    cloudGroup.animations,
    cloudGroup.scene
  );

  const playAnimation = (actions, animationName) => {
    if (actions[animationName]) {
      actions[animationName].play();
    }
  };

  useEffect(() => {
    playAnimation(phoenixAnimations.actions, "Take 001");

    playAnimation(cloudGroupAnimations.actions, "Armature.001Action");
    playAnimation(cloudGroupAnimations.actions, "ArmatureAction.003");
    playAnimation(cloudGroupAnimations.actions, "Key.001Action");
    playAnimation(cloudGroupAnimations.actions, "Key.002Action.001");
    playAnimation(cloudGroupAnimations.actions, "Key.002Action.002");
    playAnimation(cloudGroupAnimations.actions, "Key.002Action.003");
    playAnimation(cloudGroupAnimations.actions, "Key.002Action.004");
    playAnimation(cloudGroupAnimations.actions, "KeyAction.002");
    playAnimation(cloudGroupAnimations.actions, "Sphere.001Action");
    playAnimation(cloudGroupAnimations.actions, "Sphere.001Action.003");
  }, [phoenixAnimations.actions, cloudGroupAnimations.actions]);

  const updatePhoenixPosition = () => {
    const newPosition = getRandomPosition();
    gsap.to(phoenix.scene.position, {
      x: newPosition[0],
      y: newPosition[1],
      duration: 10,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const intervalId = setInterval(updatePhoenixPosition, 1500);
    return () => clearInterval(intervalId);
  });

  const getRandomPosition = () => {
    const minX = 2.5;
    const maxX = 5;
    const minY = -2;
    const maxY = 0;
    const minZ = -1;
    const maxZ = 1;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;
    const randomZ = Math.random() * (maxZ - minZ) + minZ;

    return [randomX, randomY, randomZ];
  };

  return (
    <>
      <PresentationControls
        global
        polar={[0, 0.2]}
        azimuth={[-0.75, 0.25]}
        config={{ mass: 2, tension: 200 }}
        snap={{ mass: 1, tension: 50 }}
      >
        <directionalLight color="white" intensity={2} position={[0, 0, 2]} />
        <ambientLight intensity={1} />

        <primitive
          object={cloudGroup.scene}
          position={[1, 2, -2.25]}
          rotation={[0.35, 0, 0]}
          scale={0.375}
        />
        <primitive
          object={phoenix.scene}
          position={getRandomPosition()}
          scale={0.0035}
        />
      </PresentationControls>
    </>
  );
}
