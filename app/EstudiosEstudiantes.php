<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EstudiosEstudiantes extends Model
{
    protected $fillable = [
        'id',
        'Titulo',
        'Id_Estudiante',
        'Id_Grado',
        'Universidad',
        'Anio',
        'Lugar',
        'Ruta_Archivo',
        'NombreArchivo'
    ];

    public function RegistrarPreparacionAcademica($request){
        $archivo = $request->file('Archivo');
        $anio = $request->get('Anio');
        $titulo = $request->get('Titulo');
        $grados = ['Licenciatura', 'Maestria', 'Doctorado'];

        $iniciales = "";
        $aux=explode(" ", $titulo);
        for ($i=0; $i < count($aux) ; $i++) { 
            $iniciales = $iniciales . substr($aux[$i], 0, 1);
        }

        $Estudiante = new Estudiantes();
        $Estudiante = $Estudiante->ObtenerNombreEstudiante($request->get('idEstudiante'));
        $inicialesEst = "";
        $aux2=explode(" ", $Estudiante[0]->Nombre);
        for ($i=0; $i < count($aux2) ; $i++) { 
            $inicialesEst = $inicialesEst . substr($aux2[$i], 0, 1);
        }
        $inicialesEst = $inicialesEst . substr($Estudiante[0]->Apellido_P, 0, 1);
        $inicialesEst = $inicialesEst . substr($Estudiante[0]->Apellido_M, 0, 1);
        
        try {
            mkdir(public_path().'/storage/Documentos/Estudiantes/PreparacionAcademica/'.$request->get('idEstudiante').'/', 0700);
        } catch (\Throwable $th) {
            //throw $th;
        }
        
        $extension = $archivo->getClientOriginalExtension();
        $fileName = $inicialesEst."-".$grados[$request->get('Id_Grado')-1]."-".$iniciales.'-'.$anio.'.'.$extension;
        $tmpPath = $archivo;
        $newPath = public_path().'/storage/Documentos/Estudiantes/PreparacionAcademica/'.$request->get('idEstudiante').'/'.$fileName;
        move_uploaded_file($tmpPath,$newPath);

        $datos = new EstudiosEstudiantes ([
            'Titulo'=> $request->get('Titulo'),
            'Id_Estudiante'=> $request->get('idEstudiante'),
            'Id_Grado'=> $request->get('Id_Grado'),
            'Universidad'=> $request->get('Universidad'),
            'Anio'=> $request->get('Anio'),
            'Lugar'=> $request->get('Lugar'),
            'Ruta_Archivo'=> '/storage/Documentos/Estudiantes/PreparacionAcademica/'.$request->get('idEstudiante').'/'.$fileName,
            'NombreArchivo'=> $fileName
        ]); 
        $datos->save();

        return "hecho";
    }

    public function EliminarPreparacionAcademica($request){
        $ids = $request->get('Ids');
        for ($i=0; $i < count($ids); $i++) { 
            $Estudios = EstudiosEstudiantes::find($ids[$i]);
            $file = glob(public_path().$Estudios->Ruta_Archivo);
            unlink($file[0]); 
            $Estudios->delete();
        }

        
        return "hecho";
    }

    public function ModificarPreparacionAcademica($request){
        $archivo = $request->file('Archivo');
        $anio = $request->get('Anio');
        $titulo = $request->get('Titulo');
        $grados = ['Licenciatura', 'Maestria', 'Doctorado'];
        $idRegistro = $request->get('IdRegistro');

        $Estudios = EstudiosEstudiantes::find($idRegistro);

        $iniciales = "";
        $aux=explode(" ", $titulo);
        for ($i=0; $i < count($aux) ; $i++) { 
            $iniciales = $iniciales . substr($aux[$i], 0, 1);
        }

        $estudiante = new Estudiantes();
        $estudiante = $estudiante->ObtenerNombreEstudiante($request->get('idEstudiante'));
        $inicialesEst = "";
        $aux2=explode(" ", $estudiante[0]->Nombre);
        for ($i=0; $i < count($aux2) ; $i++) { 
            $inicialesEst = $inicialesEst . substr($aux2[$i], 0, 1);
        }
        $inicialesEst = $inicialesEst . substr($estudiante[0]->Apellido_P, 0, 1);
        $inicialesEst = $inicialesEst . substr($estudiante[0]->Apellido_M, 0, 1);

        $filename="";
        if($archivo!=null){
            try {
                $file = glob(public_path().$Estudios->Ruta_Archivo);
                unlink($file[0]);
            }catch(\Throwable $th){} 

            $extension = $archivo->getClientOriginalExtension();
            $fileName = $inicialesEst."-".$grados[$request->get('Id_Grado')-1]."-".$iniciales.'-'.$anio.'.'.$extension;
            $tmpPath = $archivo;
            $newPath = public_path().'/storage/Documentos/Estudiantes/PreparacionAcademica/'.$request->get('idEstudiante').'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);
        }else{
            $extension = "pdf";
            $fileName = $inicialesEst."-".$grados[$request->get('Id_Grado')-1]."-".$iniciales.'-'.$anio.'.'.$extension;
            $newPath = public_path().'/storage/Documentos/Estudiantes/PreparacionAcademica/'.$request->get('idEstudiante').'/'.$fileName;
            rename(public_path().$Estudios->Ruta_Archivo,$newPath);
        }

        $Estudios->Titulo = $request->get('Titulo');
        $Estudios->Id_Estudiante = $request->get('idEstudiante');
        $Estudios->Id_Grado = $request->get('Id_Grado');
        $Estudios->Universidad = $request->get('Universidad');
        $Estudios->Anio = $request->get('Anio');
        $Estudios->Lugar = $request->get('Lugar');
        $Estudios->Ruta_Archivo = '/storage/Documentos/Estudiantes/PreparacionAcademica/'.$request->get('idEstudiante').'/'.$fileName;
        $Estudios->NombreArchivo = $fileName;
        
        $Estudios->save();

        return "cambios hechos";
    }

    public function ObtenerEstudiosByEstudiante($request){
        $idEstudiante = $request->get('idEstudiante');
        $Estudios = EstudiosEstudiantes::join('grados_academicos', 'estudios_estudiantes.Id_Grado', '=', 'grados_academicos.id')
            ->select('estudios_estudiantes.id','Titulo', 'grados_academicos.Grado as Grado', 'Id_Grado', 'Universidad', 'Anio', 'Lugar', 'Ruta_Archivo', 'NombreArchivo')
            ->where('Id_Estudiante', '=', $idEstudiante)->get();
        return $Estudios;
    }
}
