import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const WALK_SPEED = 12;
const SPRINT_SPEED = 20;
const CROUCH_SPEED = 5;
const JUMP_FORCE = 7;
const CAMERA_HEIGHT = 1.5;
const CROUCH_HEIGHT = 0.8;
const ACCELERATION = 0.6;
const AIR_CONTROL = 0.2;

export function Player() {
  const { moveForward, moveBackward, moveLeft, moveRight, jump, sprint, crouch } = useKeyboard();
  const { camera, gl } = useThree();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 2, 0],
    args: [0.4], // Melhor contato com o chão
    linearDamping: 0.8,
    fixedRotation: true
  }));

  const pos = useRef([0, 0, 0]);
  const vel = useRef([0, 0, 0]);
  const isGrounded = useRef(false);
  const targetHeight = useRef(CAMERA_HEIGHT);
  const lastJumpTime = useRef(0);

  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
    api.velocity.subscribe((v) => {
      vel.current = v;
      isGrounded.current = Math.abs(v[1]) < 0.05; // Detecção precisa do solo
    });

    // Cria um sinal de "+" como mira (crosshair)
    const crosshairContainer = document.createElement("div");
    crosshairContainer.style.position = "absolute";
    crosshairContainer.style.top = "50%";
    crosshairContainer.style.left = "50%";
    crosshairContainer.style.transform = "translate(-50%, -50%)";
    crosshairContainer.style.zIndex = "1000";
    crosshairContainer.style.pointerEvents = "none";

    const crosshairSize = "12px";
    const lineWidth = "2px";
    const color = "white";

    // Linha vertical
    const verticalLine = document.createElement("div");
    verticalLine.style.position = "absolute";
    verticalLine.style.width = lineWidth;
    verticalLine.style.height = crosshairSize;
    verticalLine.style.background = color;
    verticalLine.style.left = "50%";
    verticalLine.style.top = "50%";
    verticalLine.style.transform = "translate(-50%, -50%)";

    // Linha horizontal
    const horizontalLine = document.createElement("div");
    horizontalLine.style.position = "absolute";
    horizontalLine.style.width = crosshairSize;
    horizontalLine.style.height = lineWidth;
    horizontalLine.style.background = color;
    horizontalLine.style.left = "50%";
    horizontalLine.style.top = "50%";
    horizontalLine.style.transform = "translate(-50%, -50%)";

    crosshairContainer.appendChild(verticalLine);
    crosshairContainer.appendChild(horizontalLine);
    document.body.appendChild(crosshairContainer);

    return () => {
      document.body.removeChild(crosshairContainer);
    };
  }, [api.position, api.velocity, gl]);

  useFrame((state) => {
    // Atualiza a altura da câmera para suportar o agachamento
    const targetY = crouch ? CROUCH_HEIGHT : CAMERA_HEIGHT;
    targetHeight.current += (targetY - targetHeight.current) * 0.2; // Suaviza a transição
    camera.position.set(pos.current[0], pos.current[1] + targetHeight.current, pos.current[2]);

    const speed = sprint ? SPRINT_SPEED : crouch ? CROUCH_SPEED : WALK_SPEED;

    const direction = new Vector3();
    const forward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
    
    forward.y = 0;
    right.y = 0;
    forward.normalize();
    right.normalize();

    if (moveForward) direction.add(forward);
    if (moveBackward) direction.sub(forward);
    if (moveRight) direction.add(right);
    if (moveLeft) direction.sub(right);

    if (direction.lengthSq() > 0) {
      direction.normalize().multiplyScalar(speed);
      const control = isGrounded.current ? ACCELERATION : AIR_CONTROL;
      api.velocity.set(
        vel.current[0] + (direction.x - vel.current[0]) * control,
        vel.current[1],
        vel.current[2] + (direction.z - vel.current[2]) * control
      );
    } else {
      api.velocity.set(
        vel.current[0] * (isGrounded.current ? 0.7 : 0.98),
        vel.current[1],
        vel.current[2] * (isGrounded.current ? 0.7 : 0.98)
      );
    }

    if (jump && isGrounded.current) {
      const now = state.clock.getElapsedTime();
      if (now - lastJumpTime.current > 0.25) {
        api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
        lastJumpTime.current = now;
      }
    }

    if (vel.current[1] < -15) {
      api.velocity.set(vel.current[0], -15, vel.current[2]);
    }
  });

  return <mesh ref={ref as React.RefObject<THREE.Mesh>} />;
}
