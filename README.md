# simplify-showcase

На текущий момент, здесь нет пакетной обработки. Поэтому на случай разработки, [подходящая статья](https://vladmihalcea.com/scheduled-jobs-best-practices/) или [гугл](https://www.google.com/search?q=batch+processing+best+practices)

* [Overview openpose (перечень настроек)](https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/master/doc/demo_overview.md)
* [Перечень настроек-2](https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/master/doc/quick_start.md#maximum-accuracy-configuration)

* Для триангуляции костей в OpenPose, необходимо произвести [калибровку](https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/master/doc/modules/calibration_module.md) камер. Для этого потребуется: 3 камеры, и "шахматная доска" размером не менее 8х6 с размером квадрата не менее 100 миллиметров.

./build/examples/openpose/openpose.bin --num_gpu 0 --flir_camera --flir_camera_index 0