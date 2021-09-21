<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConveniosMovilidad extends Model
{
    protected $fillable = [
        'id',
        'Nombre_Convenio',
        'Sector',
        'Fecha_Inicio',
        'Fecha_Conclusion',
        'Institucion_Organizacion',
        'Ciudad',
        'Pais',
        'Ruta_Evidencia',
        'Nombre_Evidencia',
        'Estado'
    ];

    public function MostrarConvenios(){
        $convenios = ConveniosMovilidad::join('sectores', 'convenios_movilidads.Sector', '=', 'sectores.id')
                        ->join('paises', 'convenios_movilidads.Pais', '=', 'paises.id')
                        ->select('convenios_movilidads.id', 'Nombre_Convenio', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Inicio', 'Fecha_Conclusion', 'Institucion_Organizacion', 'Ciudad', 'paises.Pais as Pais', 'Ruta_Evidencia', 'Nombre_Evidencia')
                        ->orderBy('Nombre_Convenio', 'DESC')->get();
        return $convenios;
    }
    
    public function RegistrarDG($request){
        $estado = "Vigente";
        $NombreArchivo = null;
        $RutaArchivo = null;

        $sectores = array("Evento-Academico", "Productivo", "Social", "Gubernamental", "Estancia-Academica", "Congreso");

        $datos = new ConveniosMovilidad([
            'Nombre_Convenio'=> $request->get('Nombre'),
            'Sector'=> $request->get('Sector'),
            'Fecha_Inicio'=> $request->get('FechaComienzo'),
            'Fecha_Conclusion'=> $request->get('FechaConclusion'),
            'Institucion_Organizacion'=> $request->get('Institucion'),
            'Ciudad'=> $request->get('Ciudad'),
            'Pais'=> $request->get('Pais'),
            'Ruta_Evidencia'=> null,
            'Nombre_Evidencia'=> null,
            'Estado'=> $estado,
        ]); 
        $datos->save();
        $idConvenio = $datos->id;

        if ($request->file('ArchivoConvenio')!=null) {

            $archivoConvenio = $request->file('ArchivoConvenio');

            try {
                mkdir(public_path().'/storage/Documentos/ConveniosMovilidad/'.$idConvenio.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $inicialesNombre="";
            $aux=explode(" ", $request->get('Nombre'));
            for ($i=0; $i < count($aux) ; $i++) { 
                $inicialesNombre = $inicialesNombre . substr($aux[$i], 0, 1);
            }

            $inicialesInstitucion="";
            $aux2=explode(" ", $request->get('Institucion'));
            for ($i=0; $i < count($aux2) ; $i++) { 
                $inicialesInstitucion = $inicialesInstitucion . substr($aux2[$i], 0, 1);
            }

            $NombreArchivo = 'Convenio-'.$inicialesNombre.'-'.$inicialesInstitucion.'-'.$sectores[$request->get('Sector')-1].'-'.$request->get('FechaConclusion').'.';
            
            $extension = $archivoConvenio->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $archivoConvenio;
            $newPath = public_path().'/storage/Documentos/ConveniosMovilidad/'.$idConvenio.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/ConveniosMovilidad/'.$idConvenio.'/'.$fileName;
            $NombreArchivo = $fileName;

            $convenio = ConveniosMovilidad::find($idConvenio);
            
            $convenio->Nombre_Evidencia = $NombreArchivo;
            $convenio->Ruta_Evidencia = $RutaArchivo;
            
            $convenio->save();
            
        }

        return $idConvenio;
    }

    public function ModificarDG($request, $id){

        $estado = "Vigente";
        $NombreArchivo = null;
        $RutaArchivo = null;
        $sectores = array("Evento-Academico", "Productivo", "Social", "Gubernamental", "Estancia-Academica", "Congreso");

        $convenio = ConveniosMovilidad::find($id);

        $convenio->Nombre_Convenio = $request->get('Nombre');
        $convenio->Sector = $request->get('Sector');
        $convenio->Fecha_Inicio = $request->get('FechaComienzo');
        $convenio->Fecha_Conclusion = $request->get('FechaConclusion');
        $convenio->Institucion_Organizacion = $request->get('Institucion');
        $convenio->Ciudad = $request->get('Ciudad');
        $convenio->Pais = $request->get('Pais');
        $convenio->Estado = $estado;


        if ($request->file('ArchivoConvenio')!=null) {

            $archivoConvenio = $request->file('ArchivoConvenio');

            try {
                mkdir(public_path().'/storage/Documentos/ConveniosMovilidad/'.$id.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $inicialesNombre="";
            $aux=explode(" ", $request->get('Nombre'));
            for ($i=0; $i < count($aux) ; $i++) { 
                $inicialesNombre = $inicialesNombre . substr($aux[$i], 0, 1);
            }

            $inicialesInstitucion="";
            $aux2=explode(" ", $request->get('Institucion'));
            for ($i=0; $i < count($aux2) ; $i++) { 
                $inicialesInstitucion = $inicialesInstitucion . substr($aux2[$i], 0, 1);
            }

            $NombreArchivo = 'Convenio-'.$inicialesNombre.'-'.$inicialesInstitucion.'-'.$sectores[$request->get('Sector')-1].'-'.$request->get('FechaConclusion').'.';
            
            $extension = $archivoConvenio->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $archivoConvenio;
            $newPath = public_path().'/storage/Documentos/ConveniosMovilidad/'.$id.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/ConveniosMovilidad/'.$id.'/'.$fileName;
            $NombreArchivo = $fileName;
        }else{
            if ($convenio->Ruta_Evidencia!=null) {
                $inicialesNombre="";
                $aux=explode(" ", $request->get('Nombre'));
                for ($i=0; $i < count($aux) ; $i++) { 
                    $inicialesNombre = $inicialesNombre . substr($aux[$i], 0, 1);
                }

                $inicialesInstitucion="";
                $aux2=explode(" ", $request->get('Institucion'));
                for ($i=0; $i < count($aux2) ; $i++) { 
                    $inicialesInstitucion = $inicialesInstitucion . substr($aux2[$i], 0, 1);
                }

                $NombreArchivo = 'Convenio-'.$inicialesNombre.'-'.$inicialesInstitucion.'-'.$sectores[$request->get('Sector')-1].'-'.$request->get('FechaConclusion').'.';
                
                $extension = "pdf";
                $fileName = $NombreArchivo.$extension;
                $newPath = public_path().'/storage/Documentos/ConveniosMovilidad/'.$id.'/'.$fileName;
                rename(public_path().$convenio->Ruta_Evidencia,$newPath);
            
                $RutaArchivo = '/storage/Documentos/ConveniosMovilidad/'.$id.'/'.$fileName;
                $NombreArchivo = $fileName;
            }
        }

        $convenio->Ruta_Evidencia = $RutaArchivo;
        $convenio->Nombre_Evidencia = $NombreArchivo;

        $convenio->save();
        return "Cambios DG hechos";
    }

    public function ObtenerDatosGeneralesConvenio($request){
        $idConvenio = $request->get('idConvenio');
        $convenio = ConveniosMovilidad::join('sectores', 'convenios_movilidads.Sector', '=', 'sectores.id')
                ->join('paises', 'convenios_movilidads.Pais', '=', 'paises.id')
                ->select('convenios_movilidads.id', 'Nombre_Convenio', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Inicio', 'Fecha_Conclusion', 'Institucion_Organizacion', 'Ciudad', 'paises.Pais as Pais', 'Ruta_Evidencia', 'Nombre_Evidencia')
                ->where('convenios_movilidads.id', '=', $idConvenio)->first();
        return $convenio;
    }

    public function FiltradoConvenios($request){
        $mostrar = $request->get('mostrar');
        
        switch ($mostrar) {
            case 'Todos':
                $convenios = ConveniosMovilidad::join('sectores', 'convenios_movilidads.Sector', '=', 'sectores.id')
                    ->join('paises', 'convenios_movilidads.Pais', '=', 'paises.id')
                    ->select('convenios_movilidads.id', 'Nombre_Convenio', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Inicio', 'Fecha_Conclusion', 'Institucion_Organizacion', 'Ciudad', 'paises.Pais as Pais', 'Ruta_Evidencia', 'Nombre_Evidencia')
                    ->orderBy('Nombre_Convenio', 'DESC')->get();
                break;
            default:
                $convenios = ConveniosMovilidad::join('sectores', 'convenios_movilidads.Sector', '=', 'sectores.id')
                    ->join('paises', 'convenios_movilidads.Pais', '=', 'paises.id')
                    ->select('convenios_movilidads.id', 'Nombre_Convenio', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Inicio', 'Fecha_Conclusion', 'Institucion_Organizacion', 'Ciudad', 'paises.Pais as Pais', 'Ruta_Evidencia', 'Nombre_Evidencia')
                    ->where('convenios_movilidads.Sector', '=', $mostrar)
                    ->orderBy('Nombre_Convenio', 'DESC')->get();
                break;
        }
        return $convenios;
    }

    public function BusquedaConvenios($request){
        $opcion = $request->opcionBusqueda;
        $text = $request->textBusqueda;
        if($text != ""){
            switch ($opcion) {
                case 'Nombre_Convenio':
                    $convenios = ConveniosMovilidad::join('sectores', 'convenios_movilidads.Sector', '=', 'sectores.id')
                        ->join('paises', 'convenios_movilidads.Pais', '=', 'paises.id')
                        ->select('convenios_movilidads.id', 'Nombre_Convenio', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Inicio', 'Fecha_Conclusion', 'Institucion_Organizacion', 'Ciudad', 'paises.Pais as Pais', 'Ruta_Evidencia', 'Nombre_Evidencia')
                        ->where($opcion, 'like', '%'.$text.'%')
                        ->orderBy('Nombre_Convenio', 'DESC')->get();
                    break;
                
                default:
                    $convenios = ConveniosMovilidad::join('sectores', 'convenios_movilidads.Sector', '=', 'sectores.id')
                        ->join('paises', 'convenios_movilidads.Pais', '=', 'paises.id')
                        ->select('convenios_movilidads.id', 'Nombre_Convenio', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Inicio', 'Fecha_Conclusion', 'Institucion_Organizacion', 'Ciudad', 'paises.Pais as Pais', 'Ruta_Evidencia', 'Nombre_Evidencia')
                        ->orderBy('Nombre_Convenio', 'DESC')->get();
                    break;
            }
        }else{
            $convenios = ConveniosMovilidad::join('sectores', 'convenios_movilidads.Sector', '=', 'sectores.id')
                ->join('paises', 'convenios_movilidads.Pais', '=', 'paises.id')
                ->select('convenios_movilidads.id', 'Nombre_Convenio', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Inicio', 'Fecha_Conclusion', 'Institucion_Organizacion', 'Ciudad', 'paises.Pais as Pais', 'Ruta_Evidencia', 'Nombre_Evidencia')
                ->orderBy('Nombre_Convenio', 'DESC')->get();
        }
            
        return $convenios;
    }

    public function EliminarConvenio($request){
        $convenio = ConveniosMovilidad::find($request->get('idConvenio'));
        $convenio->delete();

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
            rmDir_rf(public_path().'/storage/Documentos/ConveniosMovilidad/'.$request->get('idConvenio'));
        } catch (\Throwable $th) {
            //throw $th;
        }

        return "Registro eliminado";
    }

}
