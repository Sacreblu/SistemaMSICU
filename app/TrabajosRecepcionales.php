<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TrabajosRecepcionales extends Model
{
    protected $fillable = [
        'id',
        'Id_Autor',
        'Id_Generacion',
        'Id_LGAC',
        'Titulo',
        'Estado',
        'Direccion_Repositorio',
        'Direccion_Documento',
        'Mes_Publicacion',
        'Anio_Publicacion',
        'Ruta_Archivo_Tesis',
        'Nombre_Archivo_Tesis',
        'Ruta_Acta_Examen',
        'Nombre_Acta_Examen'
    ];

    public function MostrarTrabajosRecepcionales(){
        $tesis = TrabajosRecepcionales::join('estudiantes', 'trabajos_recepcionales.Id_Autor', '=', 'estudiantes.id')
                        ->join('generaciones', 'trabajos_recepcionales.Id_Generacion', '=', 'generaciones.id')
                        ->join('l_g_a_c_s', 'trabajos_recepcionales.Id_LGAC', '=', 'l_g_a_c_s.id')
                        ->join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')
                        ->select('trabajos_recepcionales.id', 'trabajos_recepcionales.Titulo', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'generaciones.Generacion', 'l_g_a_c_s.Nombre as NombreLGAC', 'plan_estudios.Anio', 'trabajos_recepcionales.Estado')
                        ->orderBy('Apellido_P', 'DESC')->get();
        return $tesis;
    }

    public function FiltradoTesis($request){
        $mostrar = $request->get('mostrar');
        
        switch ($mostrar) {
            case 'Todos':
                $tesis = TrabajosRecepcionales::join('estudiantes', 'trabajos_recepcionales.Id_Autor', '=', 'estudiantes.id')
                    ->join('generaciones', 'trabajos_recepcionales.Id_Generacion', '=', 'generaciones.id')
                    ->join('l_g_a_c_s', 'trabajos_recepcionales.Id_LGAC', '=', 'l_g_a_c_s.id')
                    ->join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')
                    ->select('trabajos_recepcionales.id', 'trabajos_recepcionales.Titulo', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'generaciones.Generacion', 'l_g_a_c_s.Nombre as NombreLGAC', 'plan_estudios.Anio', 'trabajos_recepcionales.Estado')
                    ->orderBy('Apellido_P', 'DESC')->get();
                break;
            default:
                $tesis = TrabajosRecepcionales::join('estudiantes', 'trabajos_recepcionales.Id_Autor', '=', 'estudiantes.id')
                    ->join('generaciones', 'trabajos_recepcionales.Id_Generacion', '=', 'generaciones.id')
                    ->join('l_g_a_c_s', 'trabajos_recepcionales.Id_LGAC', '=', 'l_g_a_c_s.id')
                    ->join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')
                    ->select('trabajos_recepcionales.id', 'trabajos_recepcionales.Titulo', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'generaciones.Generacion', 'l_g_a_c_s.Nombre as NombreLGAC', 'plan_estudios.Anio', 'trabajos_recepcionales.Estado')
                    ->where('trabajos_recepcionales.Estado', '=', $mostrar)
                    ->orderBy('Apellido_P', 'DESC')->get();
                break;
        }
        return $tesis;
    }

    public function BusquedaTesis($request){
        $opcion = $request->opcionBusqueda;
        $text = $request->textBusqueda;
        if($text != ""){
            if($opcion == "Titulo"){
                $tesis = TrabajosRecepcionales::join('estudiantes', 'trabajos_recepcionales.Id_Autor', '=', 'estudiantes.id')
                ->join('generaciones', 'trabajos_recepcionales.Id_Generacion', '=', 'generaciones.id')
                ->join('l_g_a_c_s', 'trabajos_recepcionales.Id_LGAC', '=', 'l_g_a_c_s.id')
                ->join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')
                ->select('trabajos_recepcionales.id', 'trabajos_recepcionales.Titulo', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'generaciones.Generacion', 'l_g_a_c_s.Nombre as NombreLGAC', 'plan_estudios.Anio', 'trabajos_recepcionales.Estado')
                ->where($opcion, 'like', '%'.$text.'%')
                ->orderBy('Apellido_P', 'DESC')->get();
            }else{
                $tesis = TrabajosRecepcionales::join('estudiantes', 'trabajos_recepcionales.Id_Autor', '=', 'estudiantes.id')
                ->join('generaciones', 'trabajos_recepcionales.Id_Generacion', '=', 'generaciones.id')
                ->join('l_g_a_c_s', 'trabajos_recepcionales.Id_LGAC', '=', 'l_g_a_c_s.id')
                ->join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')
                ->select('trabajos_recepcionales.id', 'trabajos_recepcionales.Titulo', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'generaciones.Generacion', 'l_g_a_c_s.Nombre as NombreLGAC', 'plan_estudios.Anio', 'trabajos_recepcionales.Estado')
                ->where('estudiantes.Nombre', 'like', '%'.$text.'%')
                ->orWhere('estudiantes.Apellido_P', 'like', '%'.$text.'%')
                ->orWhere('estudiantes.Apellido_M', 'like', '%'.$text.'%')
                ->orderBy('Apellido_P', 'DESC')->get();
            }
        }else{
            $tesis = TrabajosRecepcionales::join('estudiantes', 'trabajos_recepcionales.Id_Autor', '=', 'estudiantes.id')
                    ->join('generaciones', 'trabajos_recepcionales.Id_Generacion', '=', 'generaciones.id')
                    ->join('l_g_a_c_s', 'trabajos_recepcionales.Id_LGAC', '=', 'l_g_a_c_s.id')
                    ->join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')
                    ->select('trabajos_recepcionales.id', 'trabajos_recepcionales.Titulo', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'generaciones.Generacion', 'l_g_a_c_s.Nombre as NombreLGAC', 'plan_estudios.Anio', 'trabajos_recepcionales.Estado')
                    ->orderBy('Apellido_P', 'DESC')->get();
        }
            
        return $tesis;
    }

    public function ObtenerDatosGeneralesTesis($request){
        $idTesis = $request->get('idTesis');
        $tesis = TrabajosRecepcionales::join('estudiantes', 'trabajos_recepcionales.Id_Autor', '=', 'estudiantes.id')
                ->join('generaciones', 'trabajos_recepcionales.Id_Generacion', '=', 'generaciones.id')
                ->join('l_g_a_c_s', 'trabajos_recepcionales.Id_LGAC', '=', 'l_g_a_c_s.id')
                ->join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')
                ->select('trabajos_recepcionales.id', 'trabajos_recepcionales.Id_Autor', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M', 'trabajos_recepcionales.Titulo', 'trabajos_recepcionales.Id_Generacion', 'generaciones.Generacion', 'trabajos_recepcionales.Id_LGAC', 'l_g_a_c_s.Nombre as NombreLGAC', 'plan_estudios.Anio', 'trabajos_recepcionales.Estado', 'Direccion_Repositorio', 'Direccion_Documento', 'Mes_Publicacion', 'Anio_Publicacion', 'Ruta_Archivo_Tesis', 'Nombre_Archivo_Tesis', 'Ruta_Acta_Examen', 'Nombre_Acta_Examen')
                ->where('trabajos_recepcionales.id', '=', $idTesis)->first();
        return $tesis;
    }

    public function EliminarTesis($request){
        $tesis = TrabajosRecepcionales::find($request->get('idTesis'));
        $tesis->delete();

        function rmDir_rf($carpeta){
            foreach(glob($carpeta . "/*") as $archivos_carpeta){             
                if (is_dir($archivos_carpeta)){
                    rmDir_rf($archivos_carpeta);
                } else {
                    unlink($archivos_carpeta);
                }
            }
            rmdir($carpeta);
        }

        try {
            rmDir_rf(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$request->get('idTesis'));
        } catch (\Throwable $th) {
            //throw $th;
        }

        return "Registro eliminado";
    }

    public function RegistrarDG($request, $anioGen){
        $estado = $request->get('Estado');
        $NombreTesis = null;
        $RutaTesis = null;
        $NombreActa = null;
        $RutaActa = null;

        $datos = new TrabajosRecepcionales([
            'Id_Autor'=> $request->get('IdAutor'),
            'Id_Generacion'=> $request->get('IdGeneracion'),
            'Id_LGAC'=> $request->get('LGAC'),
            'Titulo'=> $request->get('Titulo'),
            'Estado'=> $estado,
            'Direccion_Repositorio'=> null,
            'Direccion_Documento'=> null,
            'Mes_Publicacion'=> null,
            'Anio_Publicacion'=> null,
        ]); 
        $datos->save();
        $idTesis = $datos->id;

        if($estado=="Publicado" || $estado=="Presentado"){
            $archivoTesis = $request->file('ArchivoTesis');
            
            $inicialesLGAC=substr($request->get('LGACname'), 0, 6);

            $NombreTesis = $inicialesLGAC."-";
            
            $inicialesDirector="";
            $aux2=explode(" ", $request->get('Director'));
            for ($i=0; $i < count($aux2) ; $i++) { 
                $inicialesDirector = $inicialesDirector . substr($aux2[$i], 0, 1);
            }
            $anioPub = $request->get('AnioPublicacion');

            $NombreTesis=$NombreTesis.$inicialesDirector."-".$anioPub."-Trabajo_Recepcional-";

            if($request->get('Codirector')!=null){
                $inicialesCodirector="";
                $aux3=explode(" ", $request->get('Codirector'));
                for ($i=0; $i < count($aux3) ; $i++) { 
                    $inicialesCodirector = $inicialesCodirector . substr($aux3[$i], 0, 1);
                }
                $NombreTesis=$NombreTesis."Prof-".$inicialesCodirector."-";
            }
            
            $NombreTesis = $NombreTesis."Est-G".$anioGen."-";
            
            $inicialesAutor="";
            $aux=explode(" ", $request->get('Autor'));
            for ($i=0; $i < count($aux) ; $i++) { 
                $inicialesAutor = $inicialesAutor . substr($aux[$i], 0, 1);
            }

            $NombreTesis = $NombreTesis.$inicialesAutor.".";

            try {
                mkdir(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $extension = $archivoTesis->getClientOriginalExtension();
            $fileName = $NombreTesis.$extension;
            $tmpPath = $archivoTesis;
            $newPath = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaTesis = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$fileName;
            $NombreTesis = $fileName;

            
            $archivoActaExamen = $request->file('ArchivoActaDeExamen');
            
            $NombreActa = $inicialesAutor."-G".$anioGen."-Acta_Examen.";
            
            $extension2 = $archivoActaExamen->getClientOriginalExtension();
            $fileName2 = $NombreActa.$extension2;
            $tmpPath2 = $archivoActaExamen;
            $newPath2 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$fileName2;
            move_uploaded_file($tmpPath2,$newPath2);

            $RutaActa = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$fileName2;
            $NombreActa = $fileName2;

            $tesis = TrabajosRecepcionales::find($idTesis);
            
            $tesis->Direccion_Repositorio = $request->get('DireccionRepositorio');
            $tesis->Direccion_Documento = $request->get('DireccionDocumento');
            $tesis->Mes_Publicacion = $request->get('MesPublicacion');
            $tesis->Anio_Publicacion = $request->get('AnioPublicacion');
            
            $tesis->Nombre_Archivo_Tesis = $NombreTesis;
            $tesis->Ruta_Archivo_Tesis = $RutaTesis;
            $tesis->Nombre_Acta_Examen = $NombreActa;
            $tesis->Ruta_Acta_Examen = $RutaActa;
            
            $tesis->save();

        }
        return $idTesis;
    }

    public function ModificarDG($request, $anioGen, $idTesis){
        $estado = $request->get('Estado');
        $NombreTesis = null;
        $RutaTesis = null;
        $NombreActa = null;
        $RutaActa = null;

        $tesis = TrabajosRecepcionales::find($idTesis);

        $tesis->Id_Autor = $request->get('IdAutor');
        $tesis->Id_Generacion = $request->get('IdGeneracion');
        $tesis->Id_LGAC = $request->get('LGAC');
        $tesis->Titulo = $request->get('Titulo');
        $tesis->Estado = $estado;
        $tesis->Direccion_Repositorio = null;
        $tesis->Direccion_Documento = null;
        $tesis->Mes_Publicacion = null;
        $tesis->Anio_Publicacion = null;
        

        if($estado=="Publicado" || $estado=="Presentado"){
            if($request->file('ArchivoTesis')!=null){

                try {
                    $file = glob(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$request->get('NombreArchivoTesis')); //obtenemos todos los nombres de los ficheros
                    unlink($file[0]);
                } catch (\Throwable $th) {
                    //throw $th;
                }

                $archivoTesis = $request->file('ArchivoTesis');
            
                $inicialesLGAC=substr($request->get('LGACname'), 0, 6);

                $NombreTesis = $inicialesLGAC."-";
                
                $inicialesDirector="";
                $aux2=explode(" ", $request->get('Director'));
                for ($i=0; $i < count($aux2) ; $i++) { 
                    $inicialesDirector = $inicialesDirector . substr($aux2[$i], 0, 1);
                }
                $anioPub = $request->get('AnioPublicacion');

                $NombreTesis=$NombreTesis.$inicialesDirector."-".$anioPub."-Trabajo_Recepcional-";

                if($request->get('Codirector')!=null){
                    $inicialesCodirector="";
                    $aux3=explode(" ", $request->get('Codirector'));
                    for ($i=0; $i < count($aux3) ; $i++) { 
                        $inicialesCodirector = $inicialesCodirector . substr($aux3[$i], 0, 1);
                    }
                    $NombreTesis=$NombreTesis."Prof-".$inicialesCodirector."-";
                }
                
                $NombreTesis = $NombreTesis."Est-G".$anioGen."-";
                
                $inicialesAutor="";
                $aux=explode(" ", $request->get('Autor'));
                for ($i=0; $i < count($aux) ; $i++) { 
                    $inicialesAutor = $inicialesAutor . substr($aux[$i], 0, 1);
                }

                $NombreTesis = $NombreTesis.$inicialesAutor.".";

                try {
                    mkdir(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/', 0700);
                } catch (\Throwable $th) {
                    //throw $th;
                }

                $extension = $archivoTesis->getClientOriginalExtension();
                $fileName = $NombreTesis.$extension;
                $tmpPath = $archivoTesis;
                $newPath = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$fileName;
                move_uploaded_file($tmpPath,$newPath);

                $RutaTesis = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$fileName;
                $NombreTesis = $fileName;

                $tesis->Nombre_Archivo_Tesis = $NombreTesis;
                $tesis->Ruta_Archivo_Tesis = $RutaTesis;
            }else{
                $inicialesLGAC=substr($request->get('LGACname'), 0, 6);

                $NombreTesis = $inicialesLGAC."-";
                
                $inicialesDirector="";
                $aux2=explode(" ", $request->get('Director'));
                for ($i=0; $i < count($aux2) ; $i++) { 
                    $inicialesDirector = $inicialesDirector . substr($aux2[$i], 0, 1);
                }
                $anioPub = $request->get('AnioPublicacion');

                $NombreTesis=$NombreTesis.$inicialesDirector."-".$anioPub."-Trabajo_Recepcional-";

                if($request->get('Codirector')!=null){
                    $inicialesCodirector="";
                    $aux3=explode(" ", $request->get('Codirector'));
                    for ($i=0; $i < count($aux3) ; $i++) { 
                        $inicialesCodirector = $inicialesCodirector . substr($aux3[$i], 0, 1);
                    }
                    $NombreTesis=$NombreTesis."Prof-".$inicialesCodirector."-";
                }
                
                $NombreTesis = $NombreTesis."Est-G".$anioGen."-";
                
                $inicialesAutor="";
                $aux=explode(" ", $request->get('Autor'));
                for ($i=0; $i < count($aux) ; $i++) { 
                    $inicialesAutor = $inicialesAutor . substr($aux[$i], 0, 1);
                }

                $NombreTesis = $NombreTesis.$inicialesAutor.".";

                $extension = "pdf";
                $fileName = $NombreTesis.$extension;
                $newPath = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$fileName;
                rename(public_path().$tesis->Ruta_Archivo_Tesis,$newPath);

                $RutaTesis = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$fileName;
                $NombreTesis = $fileName;

                $tesis->Nombre_Archivo_Tesis = $NombreTesis;
                $tesis->Ruta_Archivo_Tesis = $RutaTesis;

            }

            if($request->file('ArchivoActaDeExamen')!=null){
                try {
                    $file = glob(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$request->get('NombreArchivoActaDeExamen')); //obtenemos todos los nombres de los ficheros
                    unlink($file[0]);
                } catch (\Throwable $th) {
                    //throw $th;
                }
                
                $archivoActaExamen = $request->file('ArchivoActaDeExamen');

                $inicialesAutor="";
                $aux=explode(" ", $request->get('Autor'));
                for ($i=0; $i < count($aux) ; $i++) { 
                    $inicialesAutor = $inicialesAutor . substr($aux[$i], 0, 1);
                }
            
                $NombreActa = $inicialesAutor."-G".$anioGen."-Acta_Examen.";

                try {
                    mkdir(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/', 0700);
                } catch (\Throwable $th) {
                    //throw $th;
                }

                $extension2 = $archivoActaExamen->getClientOriginalExtension();
                $fileName2 = $NombreActa.$extension2;
                $tmpPath2 = $archivoActaExamen;
                $newPath2 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$fileName2;
                move_uploaded_file($tmpPath2,$newPath2);
    
                $RutaActa = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$fileName2;
                $NombreActa = $fileName2;

                $tesis->Nombre_Acta_Examen = $NombreActa;
                $tesis->Ruta_Acta_Examen = $RutaActa;
            }else{
                $inicialesAutor="";
                $aux=explode(" ", $request->get('Autor'));
                for ($i=0; $i < count($aux) ; $i++) { 
                    $inicialesAutor = $inicialesAutor . substr($aux[$i], 0, 1);
                }
            
                $NombreActa = $inicialesAutor."-G".$anioGen."-Acta_Examen.";

                $extension2 = "pdf";
                $fileName2 = $NombreActa.$extension2;
                $newPath2 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$fileName2;
                rename(public_path().$tesis->Ruta_Acta_Examen,$newPath);
    
                $RutaActa = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/'.$fileName2;
                $NombreActa = $fileName2;

                $tesis->Nombre_Acta_Examen = $NombreActa;
                $tesis->Ruta_Acta_Examen = $RutaActa;
            }
            
            $tesis->Direccion_Repositorio = $request->get('DireccionRepositorio');
            $tesis->Direccion_Documento = $request->get('DireccionDocumento');
            $tesis->Mes_Publicacion = $request->get('MesPublicacion');
            $tesis->Anio_Publicacion = $request->get('AnioPublicacion');
        }else{
            $tesis->Nombre_Archivo_Tesis = $NombreTesis;
            $tesis->Ruta_Archivo_Tesis = $RutaTesis;
            $tesis->Nombre_Acta_Examen = $NombreActa;
            $tesis->Ruta_Acta_Examen = $RutaActa;

            
            function rmDir_rf($carpeta){
                foreach(glob($carpeta . "/*") as $archivos_carpeta){             
                    if (is_dir($archivos_carpeta)){
                        rmDir_rf($archivos_carpeta);
                    } else {
                        unlink($archivos_carpeta);
                    }
                }
                rmdir($carpeta);
            }

            try {
                rmDir_rf(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis);
            } catch (\Throwable $th) {
                //throw $th;
            }
            
           
        }

        $tesis->save();
    }
    
    
}
