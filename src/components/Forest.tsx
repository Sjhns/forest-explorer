import { Tree } from './Tree';

export function Forest() {
  // Cria grupos de árvores para um visual mais natural
  const createTreeGroup = (centerX: number, centerZ: number, count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = Math.random() * 5 + 2;
      const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 3;
      const z = centerZ + Math.sin(angle) * radius + (Math.random() - 0.5) * 3;
      const scale = 0.8 + Math.random() * 0.4; // Variação no tamanho
      return {
        position: [x, 0, z] as [number, number, number],
        scale,
      };
    });
  };

  // Cria vários grupos de árvores espalhados
  const treeGroups = Array.from({ length: 30 }, () => {
    const x = Math.random() * 200 - 100;
    const z = Math.random() * 200 - 100;
    return createTreeGroup(x, z, Math.floor(Math.random() * 5) + 3);
  }).flat();

  // Adiciona algumas árvores isoladas
  const singleTrees = Array.from({ length: 50 }, () => ({
    position: [
      Math.random() * 200 - 100,
      0,
      Math.random() * 200 - 100,
    ] as [number, number, number],
    scale: 0.9 + Math.random() * 0.3,
  }));

  const allTrees = [...treeGroups, ...singleTrees];

  return (
    <>
      {allTrees.map((tree, index) => (
        <Tree
          key={index}
          position={tree.position}
          scale={tree.scale}
        />
      ))}
    </>
  );
}