<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CartasNAB extends Model
{
    protected $fillable = [
        'id',
        'Id_Profesor',
        'Ruta_Archivo',
        'Vigente',
        'Fecha_Registro',
        'NombreArchivo'
    ];

    public function RegistrarCartasNAB($request){
        
        $archivos = $request->file('cartas');
        $lengthArray = count($archivos);
        if($lengthArray>0){
            $profesor = new Profesores();
            $profesor = $profesor->ObtenerNombreProfesor($request->get('idProfesor'));
            $iniciales = "";
            $aux=explode(" ", $profesor[0]->Nombre);
            for ($i=0; $i < count($aux) ; $i++) { 
                $iniciales = $iniciales . substr($aux[$i], 0, 1);
            }
            $iniciales = $iniciales . substr($profesor[0]->Apellido_P, 0, 1);
            $iniciales = $iniciales . substr($profesor[0]->Apellido_M, 0, 1);
            mkdir(public_path().'/storage/Documentos/Profesores/CartasNAB/'.$request->get('idProfesor').'/', 0700);

            for ($i=0; $i < $lengthArray; $i++) {
                $versiion = $i+1;
                $nombreOriginal = $archivos[$i]->getClientOriginalName();
                $extension = $archivos[$i]->getClientOriginalExtension();
                $fileName = 'CARTA-NAB-'.$iniciales.'-v'.$versiion.'.'.$extension;
                $tmpPath = $archivos[$i];
                $newPath = public_path().'/storage/Documentos/Profesores/CartasNAB/'.$request->get('idProfesor').'/'.$fileName;
                move_uploaded_file($tmpPath,$newPath);
                $vigente = "off";
                if ($i==$request->get('ArchivoVigente')) {
                    $vigente = "on";
                }
                $datos = new CartasNAB ([
                    'Id_Profesor'=> $request->get('idProfesor'),
                    'NombreArchivo'=> $fileName,
                    'Ruta_Archivo'=> '/storage/Documentos/Profesores/CartasNAB/'.$request->get('idProfesor').'/'.$fileName,
                    'Vigente'=> $vigente,
                    'Fecha_Registro'=> $request->get('fechaRegistro')
                ]); 
                $datos->save();
            }
        }
        

        return "cartas registradas";
    }

    public function ModificarCartasNAB($request){
        try {
            mkdir(public_path().'/storage/Documentos/Profesores/CartasNAB/'.$request->get('idProfesor').'/', 0700);
        } catch (\Throwable $th) {
            //throw $th;
        }

        
        CartasNAB::where('Id_Profesor', "=", $request->get('idProfesor'))->delete();

        $files = glob(public_path().'/storage/Documentos/Profesores/CartasNAB/'.$request->get('idProfesor').'/*.pdf'); //obtenemos todos los nombres de los ficheros
        foreach($files as $file){
            if(is_file($file))
            unlink($file); //elimino el fichero
        }

        $archivos = $request->file('cartas');

        if($archivos!=null){
            $profesor = new Profesores();
            $profesor = $profesor->ObtenerNombreProfesor($request->get('idProfesor'));
            $iniciales = "";
            $aux=explode(" ", $profesor[0]->Nombre);
            for ($i=0; $i < count($aux) ; $i++) { 
                $iniciales = $iniciales . substr($aux[$i], 0, 1);
            }
            $iniciales = $iniciales . substr($profesor[0]->Apellido_P, 0, 1);
            $iniciales = $iniciales . substr($profesor[0]->Apellido_M, 0, 1);

            $lengthArray = count($archivos);
            for ($i=0; $i < $lengthArray; $i++) {
                $version = $i+1;
                $nombreOriginal = $archivos[$i]->getClientOriginalName();
                $extension = $archivos[$i]->getClientOriginalExtension();
                $fileName = 'CARTA-NAB-'.$iniciales.'-v'.$version.'.'.$extension;
                $tmpPath = $archivos[$i];
                $newPath = public_path().'/storage/Documentos/Profesores/CartasNAB/'.$request->get('idProfesor').'/'.$fileName;
                move_uploaded_file($tmpPath,$newPath);

                $vigente = "off";
                if ($i==$request->get('ArchivoVigente')) {
                    $vigente = "on";
                }
                
                $fechas = $request->get('fechasGuardadas');

                if($fechas!=null){
                    $lengthFechas = count($fechas);
                    if($i<$lengthFechas){
                        $fechas = $fechas[$i];
                    }else{
                        $fechas = $request->get('fechaRegistro');
                    }
                }else{
                    $fechas = $request->get('fechaRegistro');
                }
                

                $datos = new CartasNAB ([
                    'Id_Profesor'=> $request->get('idProfesor'),
                    'NombreArchivo'=> $fileName,
                    'Ruta_Archivo'=> '/storage/Documentos/Profesores/CartasNAB/'.$request->get('idProfesor').'/'.$fileName,
                    'Vigente'=> $vigente,
                    'Fecha_Registro'=> $fechas
                ]); 
                $datos->save();
            }
        }
        return "well done";
    }

    public function ObtenerCartasByProfesor($request){
        $idProfesor = $request->get('idProfe');
        $Cartas = CartasNAB::select('id','Ruta_Archivo', 'NombreArchivo', 'Fecha_Registro', 'Vigente')
            ->where('Id_Profesor', '=', $idProfesor)->get();
        return $Cartas;
    }
}
