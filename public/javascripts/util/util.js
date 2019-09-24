export const util={
    /**
     *
     *
     * @param {String} url
     * @param {Object} data
     */
    pageGoPost(url, data) {
        var form = document.createElement("form");
        var param = [];

        form.action = url;
        form.method = "post";
        console.log("data ",data);
        

        for (const key in data) {
            param.push( [key, data.key] );
            let input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute('name', key);
            input.setAttribute("value", data[key]);
            form.appendChild(input);
            
        }
        //parm.push( ['some_key1', 'some_value1'] );
        console.log("form ",form);
        document.body.appendChild(form);
        form.submit(); 
    },
    /**
     * page 이동 요청 
     *
     * @param {*} url
     */
    pageGo(url){
        document.location.href = url;
    }
}