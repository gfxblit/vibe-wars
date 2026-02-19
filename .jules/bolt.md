## 2024-05-22 - TieFighter Material Optimization
**Learning:** Even when entities require unique materials (e.g. for debug coloring), sharing a single material instance among an entity's sub-meshes reduces redundancy.
**Action:** When creating composite entities, clone the material once at the entity level and pass it to all sub-meshes, rather than cloning it for each sub-mesh or relying on implicit behavior.
