class Tiempo {
    constructor(fecha1,fecha2){
        this.fecha1=fecha1;
        this.fecha2=fecha2;
        this.diferencia = new Date(fecha2).getTime() - new Date(fecha1).getTime();
    }
    getTiempoAnios(){
        return this.calcTiempoAnios;
    }
    calcTiempoAnios(){   
        const anios= this.diferencia/(1000*3600*24*365.25);
        return anios;
    }
}