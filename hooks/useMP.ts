function useMP (MPPreferenceId:string) {
    let script = document.createElement("script");
    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = MPPreferenceId;
    script.setAttribute("data-button-label", "Pagar con Mercadopago");
    
    return script;
}

export default useMP;