class Depreciacion{
    constructor(costoIni,fechaIni,fechaFin){
        this.porcentaje=0.2;
        this.vidaUtil=5;
        this.costoIni=costoIni;
        this.fechaIni=fechaIni;
        this.fechaFin=fechaFin;
    }
    
    getDepreciacion(){
        const tiempo  = new Tiempo(this.fechaIni,this.fechaFin);
        return tiempo.getTiempoAnios();
    }
}