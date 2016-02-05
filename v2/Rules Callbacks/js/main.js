/**
 * Variables Globales
 */


var rules = {
    NoAnswer: { type: 0, param: null, name: "No Answer" },
    Disturbed: { type: 0, param: null, name: "Disturbed" },
    Busy: { type: 0, param: null, name: "Busy" },
    AnsweringMachine: { type: 0, param: null, name: "Answering Machine" },
    Abandon: { type: 0, param: null, name: "Abandon" },
    Missed: { type: 0, param: null, name: "Missed" }
}

var typeJour = {
    TODAY: "TODAY",
    NEXT: "NEXT ",
    IN: "IN"
}

var rulesParamObj = function (de, a, rappelentre, et, jour) {
    this.De = de || "08:00";
    this.A = a || "12:00";
    this.Rappel_Entre = rappelentre || "12:01";
    this.Et = et || "14:00";
    this.Jour = jour || { type: typeJour.TODAY, value: -1 }
};

var jourObj = function () {
    this.type = "TODAY";
    this.value = "-1";
}


var arrayReplaceValues = function (arr1, arr2) {
    arr1.splice(0, arr1.length);
    Array.prototype.push.apply(arr1, arr2);
}
var panelRef = function () {
    this.titlePanelRule = "titre";
    this.code = "code";
}
/**
 * READY
 */
$(document).ready(function () {
    var _rules = '{"NoAnswer":{"type":3,"param":null,"name":"No Answer"},"Disturbed":{"type":2,"param":"11:11","name":"Disturbed"},"Busy":{"type":1,"param":"10:10","name":"Busy"},"AnsweringMachine":{"type":0,"param":null,"name":"Answering Machine"},"Abandon":{"type":4,"name":"Abandon","param":[{"De":"22:00","A":"22:00","Rappel_Entre":"22:01","Et":"22:00","Jour":{"type":"TODAY","value":-1}},{"De":"22:01","A":"22:01","Rappel_Entre":"22:01","Et":"22:01","Jour":{"type":"NEXT ","value":"2"}},{"De":"22:02","A":"12:02","Rappel_Entre":"12:02","Et":"14:02","Jour":{"type":"IN","value":"23"}}]},"Missed":{"type":0,"param":null,"name":"Missed"}}';
    // _rules = null;
    generateListRules(rules)
    if (_rules !== null && _rules !== undefined) {
        init(_rules);
    }
    
});

/**
 * Functions
 */

$("#btn_addPanelRules").click(function () {
    if ($("#rulesList").val() == 0) {
        return;
    } else {
        var panelRefInst = new panelRef();
        panelRefInst.titlePanelRule = $("#rulesList option:selected").text();
        panelRefInst.code = $("#rulesList option:selected").val();
        $("#block").after(addPanelRules(panelRefInst, null));
        $("#rulesList option:selected").attr('disabled', 'disabled');        
    }
});

function generateListRules(rules) {
    for (var r in rules) {
        $("#rulesList").append($('<option></option>').attr("value", r).text(rules[r].name));
    }
}
function init(rules) {
    //désérialisation 
    var rules = JSON.parse(rules);

    for (var r in rules) {
        if (rules[r].type !== 0) {
            $("#block").after(addPanelRules(new panelRef(), rules, r));
            $('#rulesList option[value="' + r + '"]').attr('disabled', 'disabled');
        }
    }
}

function addPanelRules(panelRefInst, rulesInitParam, r) {
    var rand = Math.random();
    var CallXXX;

    if (rulesInitParam !== null && rulesInitParam !== undefined) {
        panelRefInst.titlePanelRule = rulesInitParam[r].name;
        panelRefInst.code = rulesInitParam.code;
        CallXXX = r;
    } else {
        titlePanelRule = panelRefInst.titlePanelRule;
        CallXXX = panelRefInst.code;
        var select = "selected"
    }

    var panelRules = $('<div class="panel panel-default Rules" >'
        + '<div class="panel-heading">'
        + '<div class="row">'
        + '     <h4> ' + panelRefInst.titlePanelRule + '</h4>'
        + '     <button class="btn btn-danger btn-large pull-right removeRule"><i class="glyphicon glyphicon-remove"></i> </button>'
        + '     </div>'
        + '</div>'
        + ' <div class=" panel-primary panel-body">'
        + '     <div class="row collapse in">'
        + '         <div style="overflow:hidden;">'
        + '             <div class="form-group basicPanel">'
        + '                 <div class="row" >'
        + '                     <div class="col-md-4">'
        + '                         <p  class="text-right">'
        + '                             <strong>Rappel :</strong>'
        + '                         </p>'
        + '                         </div>'
        + '                         <div class="col-md-4">'
        + '                         <select name="language" data-width="auto" class="rappelList">'
        + '                             <option value="1" data-icon="flag flag-gb">Pas avant</option>'
        + '                             <option value="2" data-icon="flag flag-al">Dans</option>'
        + '                             <option value="3" data-icon="flag flag-de" ' + select + ' >Pas de rappel</option>'
        + '                         </select>'
        + '                         </div>'
        + '                         <div class="col-md-4 inputTimeDiv">'
        + '                         </div>'
        + '                 </div>'
        + '             </div>'
        + '             <div class="col-md-12"> '
        + '                 <input type="checkbox" class="advancedRulesCheckbox" id="advancedRulesCheckbox' + rand + '">'
        + '                 <label for="advancedRulesCheckbox' + rand + '">Avanced Rules</label></div>'
        + '             </div>'
        + '         </div>'
        + '     </div>'
        + ' </div>');
   
    // Liste de rappel simple selection 
 
    panelRules.find('.rappelList').change(function () {
        var textRappelListSelected = $(this).find('option:selected').text();
        var valRappelListSelected = $(this).val();
        var inputTimeDiv = panelRules.find('.inputTimeDiv');
        if (valRappelListSelected == 3) {
            rules[CallXXX].param = 0;
            rules[CallXXX].type = 3;
            inputTimeDiv.empty();
        }
        else if (inputTimeDiv.children().length == 0) {
            var inputTime = $('<input class="inputTime" type="time"/>');
            inputTimeDiv.append(inputTime);
            inputTime.blur(function () {
                rules[CallXXX].param = $(this).val();
            });
        }
        if (valRappelListSelected == 1) {
            rules[CallXXX].param = 0;
            rules[CallXXX].type = 1;
        }
        if (valRappelListSelected == 2) {
            rules[CallXXX].param = 0;
            rules[CallXXX].type = 2;
        }
    });

    panelRules.find('.removeRule').click(function () {
        panelRules.remove();
        rules[CallXXX].param = null;
        rules[CallXXX].type = 0;
        $('#rulesList option[value="' + r + '"]').removeAttr('disabled');
    });
    
    //Mode avancé des rules ajoute du tableau  
    var basicPanel = panelRules.find('.basicPanel');
    var advancedCheckBox = panelRules.find('.advancedRulesCheckbox');
    var theTable;
    if (rulesInitParam !== null && rulesInitParam !== undefined) {
        var tableRulesAdvanced = $('<div class="cold-md-12">'
            + '<div class="row">'
            + '<div class="col-sm-offset-1 col-md-10">'
            + '<table class="table tabAvancedRules"></table>'
            + '</div></div></div>');

        theTable = tableRulesAdvanced.find('.tabAvancedRules');

        var rulesAdvancedTab = [];
        rules[CallXXX].param = [];

        if (rulesInitParam[r].type === 4) {
            advancedCheckBox.click();
            basicPanel.css("display", "none");
            for (var y in rulesInitParam[r].param) {
                var ruleTr = addRules(rules[CallXXX].param, rulesAdvancedTab, rulesInitParam[r].param[y]);
                if (y < rulesInitParam[r].param.length - 1) {
                    ruleTr.find(".btnAddRuleLine").remove();
                }
                theTable.append(ruleTr);
                panelRules.append(tableRulesAdvanced);
                rules[CallXXX].type = rulesInitParam[r].type;;
            }
        } else {
            panelRules.find('.rappelList').val(rulesInitParam[r].type).selected = "selected"
            panelRules.find('.rappelList').trigger('change');
            panelRules.find('.inputTime').val(rulesInitParam[r].param);
            rules[CallXXX].type = rulesInitParam[r].type;
        }
    }
    //Event checkbox advanced rules 
    advancedCheckBox.click(function () {
        if (advancedCheckBox.is(":checked")) {
            basicPanel.css("display", "none");

            var tableRulesAdvanced = $('<div class="cold-md-12">'
                + '<div class="row">'
                + '<div class="col-sm-offset-1 col-md-10">'
                + '<table class="table tabAvancedRules"></table>'
                + '</div></div></div>');

            theTable = tableRulesAdvanced.find('.tabAvancedRules');

            var rulesAdvancedTab = [];
            rules[CallXXX].param = [];
            var ruleTr = addRules(rules[CallXXX].param, rulesAdvancedTab, new rulesParamObj());
            theTable.append(ruleTr);

            panelRules.append(tableRulesAdvanced);
            rules[CallXXX].type = 4;

        } else {
            theTable.remove();
            basicPanel.css("display", "");
        }
    });
    return panelRules;
} // Fin addPanelRules

function addRules(rulesCallXXXParam, rulesAdvancedTab, rulesParam) {

    var rand = Math.random();

    var trRules = $(' <tr>'
        + '<td>De :'
        + '        <input class="DE" type="time" value="' + rulesParam.De + '"/>'
        + '        <br /> A :'
        + '        <input class="A" value="' + rulesParam.A + '" type="time" />'
        + '    </td>'
        + '    <td>Rappel entre :'
        + '        <input class="RappelEntre" value="' + rulesParam.Rappel_Entre + '" type="time" />'
        + '        <br /> et :'
        + '        <input class="ET" type="time" value="' + rulesParam.Et + '" />'
        + '    </td>'
        + '    <td style="vertical-align: middle;">Jour :</td>'
        + '    <td style="vertical-align: middle;">'
        + '              <label><input class="jourRadio today" name="jour' + rand + '" type="radio" value="1" title="Aujourd\'hui"/>'
        + '              Aujourd\'hui</label>'
        + '             <br />'
        + '             <label><input class="jourRadio week" name="jour' + rand + '" type="radio" value="2" />'
        + '             Prochain</label>'
        + '             <select name="weekList" data-width="auto" class="weekList"> <option value="0" data-icon="flag flag-gb" selected>Lundi</option>'
        + '                 <option value="1" data-icon="flag flag-al">Mardi</option><option value="2" data-icon="flag flag-de">Mercredi</option>'
        + '                 <option value="3" data-icon="flag flag-dk">Jeudi</option> <option value="4" data-icon="flag flag-gb">Vendredi</option>'
        + '                 <option value="5" data-icon="flag flag-es">Samedi</option> <option value="6" data-icon="flag flag-fr">Dimanche</option>'
        + '             </select>'
        + '             <br />'
        + '             <label><input class="jourRadio in" name="jour' + rand + '" type="radio" value="3" />'
        + '             Dans</label>'
        + '             <input class="In" type="number" value="0" min="0" max="31"> jour(s)</input>'
        + '    </td>'
        + '    <td class="tabAvancedRulesBtn" style="vertical-align: bottom;">'
        + '        <button  type="button" class="add btn btn-success btnAddRuleLine" aria-label="Left Align">'
        + '            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>'
        + '        </button>'
        + '        <br/>'
        + '        <button type="button" class="removeTrRules remove btn btn-danger" aria-label="Left Align">'
        + '            <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>'
        + '        </button>'
        + '    </td>'
        + ' </tr>'); 
	
    // add event button en input new rules advanced
    
    var deInput = trRules.find('.DE');
    var aInput = trRules.find('.A');
    var rappelEntreInput = trRules.find('.RappelEntre');
    var etInput = trRules.find('.ET');
    var weekInput = trRules.find('.weekList');
    var inInput = trRules.find('.In');
    var rulesParamJour = new jourObj();

    if (rulesParam.Jour.type === typeJour.TODAY) {
        trRules.find('.jourRadio.today').prop('checked', true)
    } else if (rulesParam.Jour.type === typeJour.IN) {
        trRules.find('.jourRadio.in').prop('checked', true);
        trRules.find('.In').val(rulesParam.Jour.value);
    } else {
        trRules.find('.jourRadio.week').prop('checked', true);
        weekInput.val(rulesParam.Jour.value);
    }

    rulesAdvancedTab.push(rulesParam);
    arrayReplaceValues(rulesCallXXXParam, rulesAdvancedTab);
    //Event De
    deInput.blur(function () {
        rulesParam.De = deInput.val();
        arrayReplaceValues(rulesCallXXXParam, rulesAdvancedTab);
    });
    //Event A
    aInput.blur(function () {
        rulesParam.A = aInput.val();
        arrayReplaceValues(rulesCallXXXParam, rulesAdvancedTab);
    });
    // Event Rappel Entre
    rappelEntreInput.blur(function () {
        rulesParam.Rappel_Entre = rappelEntreInput.val();
        arrayReplaceValues(rulesCallXXXParam, rulesAdvancedTab);
    });
    // Event Et
    etInput.blur(function () {
        rulesParam.Et = etInput.val();
        arrayReplaceValues(rulesCallXXXParam, rulesAdvancedTab);
    });

    //Event Week
    weekInput.change(function () {
        trRules.find('.jourRadio.week').prop('checked', true);
        //trRules.trigger('change');
        trRules.find('input.jourRadio').trigger('change');
        //rulesParamJour.type = typeJour.NEXT;
        rulesParamJour.value = weekInput.val();
    });
    trRules.find('input.jourRadio').change(function (e) {
        var val = $(this).val();

        if (val == 1) {//TODAY
            rulesParamJour.type = typeJour.TODAY;
            rulesParamJour.value = -1;
        } else if (val == 2) {//Prochain
            rulesParamJour.type = typeJour.NEXT;
            rulesParamJour.value = weekInput.val();
        } else {//Dans
            rulesParamJour.type = typeJour.IN;
            rulesParamJour.value = inInput.val();
        }
        rulesParam.Jour = rulesParamJour;
        arrayReplaceValues(rulesCallXXXParam, rulesAdvancedTab);
    });
    
    //Event Dans
    inInput.focus(function () {
        trRules.find('.jourRadio.in').prop("checked", true);
        trRules.trigger('change');
    });
    inInput.change(function () {
        rulesParamJour.value = inInput.val();
    })
    
    //Remove trRules  
    trRules.find('.removeTrRules').click(function () {
        rulesAdvancedTab.splice(trRules.index(), 1);
        arrayReplaceValues(rulesCallXXXParam, rulesAdvancedTab);
        trRules.remove();
    });
    //Add trRules    	
    trRules.find('.btnAddRuleLine').click(function (rulesCallXXXParam, rulesAdvancedTab) {
        return function () {
            $(this).remove();
            var newTrRule = addRules(rulesCallXXXParam, rulesAdvancedTab, new rulesParamObj());
            trRules.parent().append(newTrRule);
        }
    } (rulesCallXXXParam, rulesAdvancedTab));

    return trRules;
}
