<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConveniosMovilidad extends Model
{
    protected $fillable = [
        'id',
        'Nombre_Clave',
        'Dependencia',
        'NombreCongreso',
        'AcronimoCongreso',
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
                        ->select('convenios_movilidads.id', 'Nombre_Clave', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Inicio', 'Fecha_Conclusion', 'Institucion_Organizacion', 'Ciudad', 'paises.Pais as Pais', 'Ruta_Evidencia', 'Nombre_Evidencia')
                        ->orderBy('Nombre_Clave', 'DESC')->get();
        return $convenios;
    }
    
    public function RegistrarDG($request){
        $estado = "Vigente";
        $NombreArchivo = null;
        $RutaArchivo = null;

        $sectores = array('Sector_Social', 'Sector_Productivo', 'Sector_Gubernamental', 'Estancia_Académica', 'Congreso');

        $datos = new ConveniosMovilidad([
            'Nombre_Clave'=> null,
            'Dependencia'=> $request->get('Dependencia'),
            'NombreCongreso'=> $request->get('NombreCongreso'),
            'AcronimoCongreso'=> $request->get('Acronimo'),
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

        $convenio = ConveniosMovilidad::find($idConvenio);

        $Anio = $request->get('FechaComienzo');
        $NombreInstitucion = $request->get('Institucion');

        $NombreClave = "";

        if ($request->get('Sector')==5) {
            $NombreClave = $request->get('Acronimo')."-".substr($Anio[0], 0, 4);
        }else{
            $aux3=explode(" ",$NombreInstitucion);
            if(count($aux3)>1){
                for ($i=0; $i < count($aux3) ; $i++) { 
                    $NombreClave = $NombreClave . substr($aux3[$i], 0, 1);
                }
            }else{
                $NombreClave = substr($aux3[0], 0, 4);
            }

            $NombreClave = $NombreClave ."-". substr($Anio, 0, 4);
        }
        
        
        $convenio->Nombre_Clave = $NombreClave;


        if ($request->file('ArchivoConvenio')!=null) {

            $archivoConvenio = $request->file('ArchivoConvenio');

            try {
                mkdir(public_path().'/storage/Documentos/ConveniosMovilidad/'.$idConvenio.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $NombreClave.'-'.$sectores[$request->get('Sector')-1].'-'.$request->get('FechaConclusion').'.';
            
            $extension = $archivoConvenio->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $archivoConvenio;
            $newPath = public_path().'/storage/Documentos/ConveniosMovilidad/'.$idConvenio.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/ConveniosMovilidad/'.$idConvenio.'/'.$fileName;
            $NombreArchivo = $fileName;

            
            
            $convenio->Nombre_Evidencia = $NombreArchivo;
            $convenio->Ruta_Evidencia = $RutaArchivo;
        }

        $convenio->save();

        return $idConvenio;
    }

    public function ModificarDG($request, $id){

        $estado = "Vigente";
        $NombreArchivo = null;
        $RutaArchivo = null;
        $sectores = array('Sector_Social', 'Sector_Productivo', 'Sector_Gubernamental', 'Estancia_Académica', 'Congreso');

        $convenio = ConveniosMovilidad::find($id);

        $convenio->Dependencia = $request->get('Dependencia');
        $convenio->NombreCongreso = $request->get('NombreCongreso');
        $convenio->AcronimoCongreso = $request->get('Acronimo');
        
        $convenio->Sector = $request->get('Sector');
        $convenio->Fecha_Inicio = $request->get('FechaComienzo');
        $convenio->Fecha_Conclusion = $request->get('FechaConclusion');
        $convenio->Institucion_Organizacion = $request->get('Institucion');
        $convenio->Ciudad = $request->get('Ciudad');
        $convenio->Pais = $request->get('Pais');
        $convenio->Estado = $estado;

        $Anio = $request->get('FechaComienzo');
        $NombreInstitucion = $request->get('Institucion');

        $NombreClave = "";

        if ($request->get('Sector')==5) {
            $NombreClave = $request->get('Acronimo')."-".substr($Anio, 0, 4);
        }else{
            $aux3=explode(" ",$NombreInstitucion);
            if(count($aux3)>1){
                for ($i=0; $i < count($aux3) ; $i++) { 
                    $NombreClave = $NombreClave . substr($aux3[$i], 0, 1);
                }
            }else{
                $NombreClave = substr($aux3[0], 0, 4);
            }

            $NombreClave = $NombreClave ."-". substr($Anio, 0, 4);
        }
        
        
        $convenio->Nombre_Clave = $NombreClave;

        if ($request->file('ArchivoConvenio')!=null) {

            $archivoConvenio = $request->file('ArchivoConvenio');

            try {
                mkdir(public_path().'/storage/Documentos/ConveniosMovilidad/'.$id.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreArchivo = $NombreClave.'-'.$sectores[$request->get('Sector')-1].'-'.$request->get('FechaConclusion').'.';

            $extension = $archivoConvenio->getClientOriginalExtension();
            $fileName = $NombreArchivo.$extension;
            $tmpPath = $archivoConvenio;
            $newPath = public_path().'/storage/Documentos/ConveniosMovilidad/'.$id.'/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);

            $RutaArchivo = '/storage/Documentos/ConveniosMovilidad/'.$id.'/'.$fileName;
            $NombreArchivo = $fileName;
        }else{
            if ($convenio->Ruta_Evidencia!=null) {
                
                $Anio = $request->get('FechaComienzo');
                $NombreInstitucion = $request->get('Institucion');

                $NombreClave = "";

                if ($request->get('Sector')==5) {
                    $NombreClave = $request->get('Acronimo')."-".substr($Anio, 0, 4);
                }else{
                    $aux3=explode(" ",$NombreInstitucion);
                    if(count($aux3)>2){
                        for ($i=0; $i < count($aux3) ; $i++) { 
                            $NombreClave = $NombreClave . substr($aux3[$i], 0, 1);
                        }
                    }else{
                        if (count($aux3)==2) {
                            for ($i=0; $i < count($aux3) ; $i++) { 
                                $NombreClave = $NombreClave . substr($aux3[$i], 0, 2);
                            }
                        }else{
                            $NombreClave = substr($aux3[0], 0, 4);
                        }
                    }

                    $NombreClave = $NombreClave ."-". substr($Anio[0], 0, 4);
                }

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
                ->select('convenios_movilidads.id', 'Nombre_Clave', 'Dependencia', 'NombreCongreso', 'AcronimoCongreso',  'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Inicio', 'Fecha_Conclusion', 'Institucion_Organizacion', 'Ciudad', 'paises.Pais as Pais', 'Ruta_Evidencia', 'Nombre_Evidencia')
                ->where('convenios_movilidads.id', '=', $idConvenio)->first();
        return $convenio;
    }

    public function FiltradoConvenios($request){
        $mostrar = $request->get('mostrar');
        
        switch ($mostrar) {
            case 'Todos':
                $convenios = ConveniosMovilidad::join('sectores', 'convenios_movilidads.Sector', '=', 'sectores.id')
                    ->join('paises', 'convenios_movilidads.Pais', '=', 'paises.id')
                    ->select('convenios_movilidads.id', 'Nombre_Clave', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Conclusion', 'Institucion_Organizacion', 'paises.Pais as Pais')
                    ->orderBy('Nombre_Clave', 'DESC')->get();
                break;
            default:
                $convenios = ConveniosMovilidad::join('sectores', 'convenios_movilidads.Sector', '=', 'sectores.id')
                    ->join('paises', 'convenios_movilidads.Pais', '=', 'paises.id')
                    ->select('convenios_movilidads.id', 'Nombre_Clave', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Conclusion', 'Institucion_Organizacion', 'paises.Pais as Pais')
                    ->where('convenios_movilidads.Sector', '=', $mostrar)
                    ->orderBy('Nombre_Clave', 'DESC')->get();
                break;
        }
        return $convenios;
    }

    public function BusquedaConvenios($request){
        $opcion = $request->opcionBusqueda;
        $text = $request->textBusqueda;
        if($text != ""){
            switch ($opcion) {
                case 'Nombre_Clave':
                    $convenios = ConveniosMovilidad::join('sectores', 'convenios_movilidads.Sector', '=', 'sectores.id')
                        ->join('paises', 'convenios_movilidads.Pais', '=', 'paises.id')
                        ->select('convenios_movilidads.id', 'Nombre_Clave', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Conclusion', 'Institucion_Organizacion', 'paises.Pais as Pais')
                        ->where($opcion, 'like', '%'.$text.'%')
                        ->orderBy('Nombre_Clave', 'DESC')->get();
                    break;
                
                default:
                    $convenios = ConveniosMovilidad::join('sectores', 'convenios_movilidads.Sector', '=', 'sectores.id')
                        ->join('paises', 'convenios_movilidads.Pais', '=', 'paises.id')
                        ->select('convenios_movilidads.id', 'Nombre_Clave', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Conclusion', 'Institucion_Organizacion', 'paises.Pais as Pais')
                        ->orderBy('Nombre_Clave', 'DESC')->get();
                    break;
            }
        }else{
            $convenios = ConveniosMovilidad::join('sectores', 'convenios_movilidads.Sector', '=', 'sectores.id')
                ->join('paises', 'convenios_movilidads.Pais', '=', 'paises.id')
                ->select('convenios_movilidads.id', 'Nombre_Clave', 'sectores.Sector', 'convenios_movilidads.Sector as idSector', 'Fecha_Conclusion', 'Institucion_Organizacion', 'paises.Pais as Pais')
                ->orderBy('Nombre_Clave', 'DESC')->get();
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
