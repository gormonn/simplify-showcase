import pyrender

material = pyrender.MetallicRoughnessMaterial(
    metallicFactor=0.0,
    alphaMode='OPAQUE',
    baseColorFactor=(1.0, 1.0, 0.9, 1.0))
mesh = pyrender.Mesh.from_trimesh(
    'sm/output/meshes/1/000.obj',
    material=material)

scene = pyrender.Scene(bg_color=[0.0, 0.0, 0.0, 0.0],
                        ambient_light=(0.3, 0.3, 0.3))
scene.add(mesh, 'mesh')


focal_length=5000.


camera = pyrender.camera.IntrinsicsCamera(
    fx=focal_length, fy=focal_length,
    cx=camera_center[0], cy=camera_center[1])


camera_center = camera.center.detach().cpu().numpy().squeeze()
camera_transl = camera.translation.detach().cpu().numpy().squeeze()


# Equivalent to 180 degrees around the y-axis. Transforms the fit to
# OpenGL compatible coordinate system.
camera_transl[0] *= -1.0

camera_pose = np.eye(4)
camera_pose[:3, 3] = camera_transl

scene.add(camera, pose=camera_pose)

# Get the lights from the viewer
light_nodes = monitor.mv.viewer._create_raymond_lights()
for node in light_nodes:
    scene.add_node(node)

r = pyrender.OffscreenRenderer(viewport_width=W,
                                viewport_height=H,
                                point_size=1.0)
color, _ = r.render(scene, flags=pyrender.RenderFlags.RGBA)
color = color.astype(np.float32) / 255.0

valid_mask = (color[:, :, -1] > 0)[:, :, np.newaxis]
input_img = img.detach().cpu().numpy()
output_img = (color[:, :, :-1] * valid_mask +
                (1 - valid_mask) * input_img)

img = pil_img.fromarray((output_img * 255).astype(np.uint8))
img.save(out_img_fn)
