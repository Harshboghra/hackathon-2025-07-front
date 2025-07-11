import { useFormContext, useWatch } from 'react-hook-form';
import React, { useEffect } from 'react';
import { IFlowNode } from '../../pages/Integration/Integration.model';
import { CheckBox } from '../../components/form/checkBox/CheckBox';
import { NumberInput } from '../../components/form/numberInput/NumberInput';
import { useTranslation } from 'react-i18next';

interface FlowCheckboxTreeProps {
  node: IFlowNode;
}
// TODO: convert enabled_flows into an array
const FlowCheckboxTree: React.FC<FlowCheckboxTreeProps> = ({ node }) => {
  const { setValue, resetField } = useFormContext();
  const { t } = useTranslation();
  const isChecked = useWatch({
    name: `enabled_flows.${node.key}.active`,
    defaultValue: false,
  });

  useEffect(() => {
    if (isChecked === false) {
      resetField(`enabled_flows.${node.key}.cron_frequancy_in_minutes`);

      const clearChildren = (children: IFlowNode[]) => {
        children.forEach((child) => {
          setValue(`enabled_flows.${child.key}.active`, false);
          resetField(`enabled_flows.${child.key}.cron_frequancy_in_minutes`);
          if (child.children?.length) clearChildren(child.children);
        });
      };

      if (node.children?.length) clearChildren(node.children);
    }
  }, [isChecked, node]);

  return (
    <div className="ml-3 mt-3">
      {/* TODO: Add Language translation in flow labels */}
      <CheckBox
        attribute={`enabled_flows.${node.key}.active`}
        form={{
          [`enabled_flows.${node.key}.active`]: {
            label: node.name,
            rules: {},
          },
        }}
      />

      {isChecked && node.hasCronFrequency && (
        <div className="ml-4 mt-2 col-8">
          <NumberInput
            attribute={`enabled_flows.${node.key}.cron_frequancy_in_minutes`}
            form={{
              [`enabled_flows.${node.key}.cron_frequancy_in_minutes`]: {
                label: t('objects.integration.formAttributes.frequency'),
                placeholder: t('objects.integration.formPlaceholder.frequency'),
                rules: {},
              },
            }}
          />
        </div>
      )}

      {isChecked &&
        node?.children &&
        node.children?.length > 0 &&
        node.children.map((childNode: IFlowNode) => (
          <FlowCheckboxTree key={childNode.key} node={childNode} />
        ))}
    </div>
  );
};

export default FlowCheckboxTree;
